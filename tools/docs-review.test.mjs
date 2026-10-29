import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { parse } from 'vue/compiler-sfc';
import { compareDocument } from './docs-review.mjs';

function document(content) {
  return `<template><DocHeader>Example</DocHeader><DocContent>${content}</DocContent></template>\n<script setup>const amount = 12;</script>`;
}

function changes(code) {
  const template = parse(code).descriptor.template;
  const branch = template.ast.children.find(node => node.props?.some(prop => prop.name === 'else')).loc.source;
  return branch.slice(branch.indexOf('>') + 1, branch.lastIndexOf('</template>'));
}

test('keeps full context, emphasis, and original/revised templates', () => {
  const before = document('<h2>Context</h2><p>Use <strong>Bitcoin</strong> today.</p><p>Unchanged context.</p>');
  const after = document('<h2>Context</h2><p>Use <em>Bitcoin Liquids</em> today.</p><p>Unchanged context.</p>');
  const result = compareDocument(before, after);
  const marked = changes(result.code);
  assert.equal(result.passages, 1);
  assert.match(marked, /<del[^>]*>Use <strong>Bitcoin<\/strong> today\./);
  assert.match(marked, /<ins[^>]*>Use <em>Bitcoin Liquids<\/em> today\./);
  assert.equal(marked.match(/Unchanged context/g).length, 1);
  assert.ok(result.code.endsWith('<script setup>const amount = 12;</script>'));
  assert.ok(result.code.includes(parse(before).descriptor.template.content));
  assert.ok(result.code.includes(parse(after).descriptor.template.content));
});

test('handles insertions and deletions at the beginning and end of lists', () => {
  const before = document('<ul><li>Delete first.</li><li>Keep.</li><li>Delete last.</li></ul>');
  const after = document('<ul><li>Keep.</li><li>Add one.</li><li>Add two.</li></ul>');
  const marked = changes(compareDocument(before, after).code);
  const dom = new JSDOM(marked).window.document;
  assert.deepEqual([...dom.querySelectorAll('ul > li')].map(item => item.textContent), [
    'Delete first.', 'Keep.', 'Delete last.', 'Add one.', 'Add two.',
  ]);
  assert.equal(dom.querySelectorAll('ul > del, ul > ins').length, 0);
  assert.equal(dom.querySelectorAll('ins').length, 2);
  assert.equal(dom.querySelectorAll('del').length, 2);
});

test('matches repeated paragraphs without replacing the wrong occurrence', () => {
  const before = document('<p>Repeated.</p><h2>Next</h2><p>Repeated.</p>');
  const after = document('<p>Repeated.</p><h2>Next</h2><p>Updated.</p>');
  const marked = changes(compareDocument(before, after).code);
  assert.ok(marked.indexOf('data-review-mark') > marked.indexOf('<h2>Next</h2>'));
  assert.equal(marked.match(/data-review-mark="removed"/g).length, 1);
});

test('marks moved paragraphs as a removal and addition without duplicating context', () => {
  const before = document('<p>First paragraph.</p><p>Second paragraph.</p><p>Last paragraph.</p>');
  const after = document('<p>Second paragraph.</p><p>First paragraph.</p><p>Last paragraph.</p>');
  const marked = changes(compareDocument(before, after).code);
  assert.equal(marked.match(/data-review-mark="removed"/g).length, 1);
  assert.equal(marked.match(/data-review-mark="added"/g).length, 1);
  assert.equal(marked.match(/Last paragraph/g).length, 1);
});

test('preserves table structure when inserting and changing rows', () => {
  const before = document('<table><tbody><tr><th>A</th><td>10</td></tr></tbody></table>');
  const after = document('<table><tbody><tr><th>A</th><td>20</td></tr><tr><th>B</th><td>30</td></tr></tbody></table>');
  const marked = changes(compareDocument(before, after).code);
  const dom = new JSDOM(marked).window.document;
  assert.equal(dom.querySelectorAll('tbody > tr').length, 2);
  assert.equal(dom.querySelectorAll('tbody > tr:first-child > td').length, 1);
  assert.equal(dom.querySelectorAll('td del').length, 1);
  assert.equal(dom.querySelectorAll('td ins').length, 1);
  assert.equal(dom.querySelector('tr[data-review-mark="added"]').textContent, 'B30');
});

test('tracks link changes while ignoring class-only changes and formula labels', () => {
  const before = document('<p class="old"><DocLink to="/old">Read more</DocLink></p><MathFormula label="Old" :formula="amount" />');
  const after = document('<p class="new"><DocLink to="/new">Read more</DocLink></p><MathFormula label="New" :formula="amount" />');
  const marked = changes(compareDocument(before, after).code);
  assert.match(marked, /<del[^>]*><DocLink to="\/old"/);
  assert.match(marked, /<ins[^>]*><DocLink to="\/new"/);
  assert.equal(compareDocument(document('<p class="old">Same.</p>'), document('<p class="new">Same.</p>')).passages, 0);
  assert.equal(marked.match(/<MathFormula/g).length, 1);
});

test('supports a new document and rejects malformed templates', () => {
  assert.ok(compareDocument(undefined, document('<p>New page.</p>')).passages > 0);
  assert.throws(() => compareDocument(document('<p>Before.</p>'), '<template><p>Broken</template>'), /Cannot parse/);
});
