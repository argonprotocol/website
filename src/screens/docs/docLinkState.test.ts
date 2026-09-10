import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createMemoryHistory, createRouter } from 'vue-router';
import toc from './toc.json';
import { isDocLinkActive } from './docLinkState';
import DocLink from './DocLink.vue';
import { TooltipTrigger } from 'reka-ui';

const settings = vi.hoisted(() => ({ override: false }));

vi.mock('./docLinkState', async importOriginal => {
  const actual = await importOriginal<typeof import('./docLinkState')>();
  return {
    ...actual,
    isDocLinkActive: (path: string, override = settings.override) => actual.isDocLinkActive(path, override),
  };
});

afterEach(() => {
  settings.override = false;
});

describe('docs link state', () => {
  it('honors every item in the table of contents', () => {
    for (const group of toc) {
      for (const item of group.items) {
        const path = '/docs/' + [group.base, item.link]
          .map(part => part.replace(/^\/+|\/+$/g, '')).filter(Boolean).join('/');
        expect(isDocLinkActive(path, false), path).toBe(item.isActive);
        expect(isDocLinkActive(path, true), path).toBe(true);
      }
    }
  });

  it.each([
    ['/docs/desktop-app/overview/?tab=one#details', false],
    ['/docs/desktop-app/Index', false],
    ['/docs/assets-and-entities', false],
    ['/docs/engine-modeling', false],
    ['/docs/bridgeless-transfers/localized-minting-authorities', false],
    ['/docs/getting-started/Index', true],
    ['/docs/system-design', true],
    ['/docs/system-design/argon-tokenomics#supply', true],
    ['/desktop-app', true],
    ['/updates/argon-is-live', true],
  ])('resolves %s to %s', (path, expected) => {
    expect(isDocLinkActive(path, false)).toBe(expected);
  });
});

async function mountLink(to: string) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { template: '<div />' } }],
  });
  await router.push('/docs');
  await router.isReady();
  const wrapper = mount(DocLink, {
    props: { to },
    attrs: { class: 'article-link', title: 'Destination' },
    slots: { default: '<strong>Read more</strong>' },
    global: { plugins: [router] },
  });
  return { router, wrapper };
}

describe('DocLink', () => {
  it('disables inactive links for pointer and keyboard activation without emitting clicks', async () => {
    const { router, wrapper } = await mountLink('/docs/desktop-app');
    const anchor = wrapper.get('a');
    expect(anchor.attributes('href')).toBeUndefined();
    expect(anchor.attributes('aria-disabled')).toBe('true');
    expect(anchor.attributes('tabindex')).toBe('-1');
    expect(anchor.classes()).toEqual(expect.arrayContaining(['opacity-50', 'article-link']));
    expect(anchor.classes()).not.toContain('pointer-events-none');
    expect(anchor.attributes('title')).toBeUndefined();
    expect(anchor.get('strong').text()).toBe('Read more');
    await anchor.trigger('click');
    await anchor.trigger('keydown', { key: 'Enter' });
    expect(router.currentRoute.value.path).toBe('/docs');
    expect(wrapper.emitted('click')).toBeUndefined();
    wrapper.unmount();
  });

  it('shows a cursor-following tooltip on hover and dismisses it on leave', async () => {
    vi.stubGlobal('ResizeObserver', class {
      observe() {
      }

      unobserve() {
      }

      disconnect() {
      }
    });
    const { wrapper } = await mountLink('/docs/desktop-app');
    try {
      const anchor = wrapper.get('a');
      await anchor.trigger('pointermove', { pointerType: 'mouse', clientX: 40, clientY: 60 });
      await vi.waitFor(() => {
        expect(document.querySelector('[role="tooltip"]')?.textContent).toContain('Coming Soon');
      });
      const trigger = wrapper.getComponent(TooltipTrigger);
      expect(trigger.props('reference')?.getBoundingClientRect()).toMatchObject({ x: 40, y: 60 });
      await anchor.trigger('pointermove', { pointerType: 'mouse', clientX: 80, clientY: 90 });
      expect(trigger.props('reference')?.getBoundingClientRect()).toMatchObject({ x: 80, y: 90 });
      await anchor.trigger('pointerleave');
      await vi.waitFor(() => expect(document.querySelector('[role="tooltip"]')).toBeNull());
    } finally {
      wrapper.unmount();
      vi.unstubAllGlobals();
    }
  });

  it.each([
    ['/docs/system-design', false],
    ['/docs/desktop-app', true],
    ['/updates/argon-is-live', false],
  ])('keeps %s navigable with override=%s', async (path, override) => {
    settings.override = override;
    const { router, wrapper } = await mountLink(path);
    const anchor = wrapper.get('a');
    expect(anchor.attributes('href')).toBe(path);
    expect(anchor.attributes('aria-disabled')).toBeUndefined();
    expect(anchor.classes()).not.toContain('opacity-50');
    await anchor.trigger('click');
    await vi.waitFor(() => expect(router.currentRoute.value.path).toBe(path));
    expect(wrapper.emitted('click')).toHaveLength(1);
    wrapper.unmount();
  });
});
