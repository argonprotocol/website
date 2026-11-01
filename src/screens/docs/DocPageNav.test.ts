import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import DocPageNav from './DocPageNav.vue';

let wrapper: VueWrapper | undefined;
let content: HTMLElement;
const scrollIntoView = vi.fn();

beforeEach(() => {
  content = document.createElement('div');
  document.body.append(content);
  vi.stubGlobal('ResizeObserver', class {
    observe() {
    }

    disconnect() {
    }
  });
  Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: scrollIntoView });
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => window.setTimeout(() => callback(0), 0));
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => window.clearTimeout(id));
  vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(4000);
  vi.stubGlobal('scrollY', 0);
});

afterEach(() => {
  wrapper?.unmount();
  wrapper = undefined;
  document.body.replaceChildren();
  window.history.replaceState(null, '', '/');
  scrollIntoView.mockClear();
  Reflect.deleteProperty(HTMLElement.prototype, 'scrollIntoView');
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('DocPageNav', () => {
  it('links all h2 sections with unique anchors while preserving existing IDs and excluding subheadings and calculators', () => {
    content.innerHTML = `
      <h1>Economic Drivers</h1>
      <div id="mining"></div>
      <div class="DocContent">
        <h2>Mining</h2>
        <h2 id="auction-revenue">Distribution of Auction Revenue</h2>
        <h3>Additional Details</h3>
        <div class="calculator-runway"><header><h3>Mining Calculator</h3></header></div>
        <h4>Bid Price</h4>
        <h2>Mining</h2>
        <section><div><h2>Sources and Notes</h2></div></section>
      </div>`;
    wrapper = mount(DocPageNav, { props: { content }, attachTo: document.body });

    const links = wrapper.findAll('nav a');
    expect(wrapper.get('nav').attributes('aria-label')).toBe('On this page');
    expect(links.map(link => link.text())).toEqual([
      'Mining', 'Distribution of Auction Revenue', 'Mining', 'Sources and Notes',
    ]);
    expect(links.map(link => link.attributes('href'))).toEqual([
      '#mining-2', '#auction-revenue', '#mining-3', '#sources-and-notes',
    ]);
    for (const link of links) {
      const heading = document.getElementById(link.attributes('href')!.slice(1))!;
      const permalink = heading.querySelector('a')!;
      expect(permalink.getAttribute('href')).toBe(link.attributes('href'));
      expect(permalink.getAttribute('aria-label')).toBe(`Link to ${link.text()}`);
      expect(heading.textContent).toBe(link.text());
    }
  });

  it('adds a keyboard-accessible permalink to a single heading without showing the page sidebar', () => {
    content.innerHTML = '<div class="DocContent"><h2 id="café">Café <span>and Rewards</span></h2></div>';
    wrapper = mount(DocPageNav, { props: { content }, attachTo: document.body });

    const permalink = content.querySelector<HTMLAnchorElement>('h2 > a')!;
    expect(wrapper.find('nav').exists()).toBe(false);
    expect(permalink.getAttribute('href')).toBe('#caf%C3%A9');
    expect(permalink.getAttribute('aria-label')).toBe('Link to Café and Rewards');
    expect(permalink.getAttribute('title')).toBe('Link to Café and Rewards');
    expect(permalink.tabIndex).toBe(0);
    permalink.focus();
    expect(document.activeElement).toBe(permalink);
    expect(content.querySelector('h2 > span')?.textContent).toBe('and Rewards');

    wrapper.unmount();
    wrapper = undefined;
    expect(content.querySelector('h2 > a')).toBeNull();
  });

  it('rebuilds after delayed loading, heading edits, and page replacement without stale links', async () => {
    content.innerHTML = '<div class="DocContent">Loading...</div>';
    wrapper = mount(DocPageNav, { props: { content }, attachTo: document.body });
    expect(wrapper.find('nav').exists()).toBe(false);

    content.innerHTML = '<div class="DocContent"><h2>Mining</h2><h2>Revenue</h2></div>';
    await vi.waitFor(() => expect(content.querySelectorAll('h2 > a')).toHaveLength(2));
    content.querySelector('h2:last-child')!.textContent = 'Auction Revenue';
    await vi.waitFor(() => expect(wrapper!.findAll('nav a')[1].text()).toBe('Auction Revenue'));
    expect(wrapper.findAll('nav a')[1].attributes('href')).toBe('#revenue');
    expect(content.querySelector('#revenue > a')?.getAttribute('aria-label')).toBe('Link to Auction Revenue');
    expect(content.querySelectorAll('#revenue > a')).toHaveLength(1);

    content.innerHTML = '<div class="DocContent"><h2>Vaulting</h2><h2>Argon Bonds</h2></div>';
    await vi.waitFor(() => expect(wrapper!.findAll('nav a').map(link => link.text())).toEqual(['Vaulting', 'Argon Bonds']));
    expect(content.querySelector('#argon-bonds > a')?.getAttribute('href')).toBe('#argon-bonds');
    content.querySelector('h2')!.remove();
    await vi.waitFor(() => expect(wrapper!.find('nav').exists()).toBe(false));
    expect(content.querySelectorAll('h2 > a')).toHaveLength(1);
  });

  it('switches content roots and ignores later changes to the old page', async () => {
    content.innerHTML = '<div class="DocContent"><h2>Mining</h2><h2>Stakes</h2></div>';
    wrapper = mount(DocPageNav, { props: { content }, attachTo: document.body });
    const nextContent = document.createElement('div');
    nextContent.innerHTML = '<div class="DocContent"><h2>Vaulting</h2><h2>Bonds</h2></div>';
    document.body.append(nextContent);
    await wrapper.setProps({ content: nextContent });

    content.innerHTML = '<div class="DocContent"><h2>Outdated</h2><h2>Page</h2></div>';
    await vi.waitFor(() => expect(wrapper!.findAll('nav a').map(link => link.text())).toEqual(['Vaulting', 'Bonds']));
    expect(nextContent.querySelectorAll('h2 > a')).toHaveLength(2);
    expect(content.querySelector('h2 > a')).toBeNull();
    nextContent.innerHTML = '<div class="DocContent"><h3>Vaulting</h3><h3>Bonds</h3></div>';
    await vi.waitFor(() => expect(wrapper!.find('nav').exists()).toBe(false));
  });

  it('restores a deep link once its asynchronously loaded heading receives an anchor', async () => {
    window.history.replaceState(null, '', '/docs/system-design/economic-drivers#argon-bonds');
    wrapper = mount(DocPageNav, { props: { content }, attachTo: document.body });
    expect(scrollIntoView).not.toHaveBeenCalled();

    content.innerHTML = '<div class="DocContent"><h2>Mining</h2><h2>Argon Bonds</h2></div>';
    await vi.waitFor(() => expect(scrollIntoView).toHaveBeenCalledOnce());
    expect(scrollIntoView.mock.instances[0]).toBe(content.querySelector('#argon-bonds'));

    content.querySelector('h2')!.textContent = 'Mining Operations';
    await vi.waitFor(() => expect(wrapper!.findAll('nav a')[0].text()).toBe('Mining Operations'));
    expect(scrollIntoView).toHaveBeenCalledOnce();
  });

  it('follows the current section as the document scrolls and selects the last section at the bottom', async () => {
    content.innerHTML = '<div class="DocContent"><h2>Mining</h2><h2>Stakes</h2><h2>Vaulting</h2></div>';
    let positions = [200, 1200, 2500];
    content.querySelectorAll('h2').forEach((heading, index) => {
      vi.spyOn(heading, 'getBoundingClientRect').mockImplementation(() => ({ top: positions[index] }) as DOMRect);
    });
    wrapper = mount(DocPageNav, { props: { content }, attachTo: document.body });
    await vi.waitFor(() => expect(wrapper!.get('[aria-current="location"]').text()).toBe('Mining'));

    positions = [-1000, 100, 1500];
    window.dispatchEvent(new Event('scroll'));
    await vi.waitFor(() => expect(wrapper!.get('[aria-current="location"]').text()).toBe('Stakes'));

    vi.stubGlobal('scrollY', 4000 - window.innerHeight);
    positions = [-2500, -1400, 200];
    window.dispatchEvent(new Event('scroll'));
    await vi.waitFor(() => expect(wrapper!.get('[aria-current="location"]').text()).toBe('Vaulting'));
  });
});
