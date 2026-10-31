import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import DocLoader from './DocLoader.vue';

vi.mock('vue-router', () => ({
  useRoute: () => ({ path: '/docs/sidebar-test', fullPath: '/docs/sidebar-test', params: { id: 'sidebar-test' } }),
}));
vi.mock('@/navigation/MainLayout.vue', () => ({ default: { template: '<main><slot /></main>' } }));
vi.mock('./DocLink.vue', () => ({ default: { template: '<a><slot /></a>' } }));
vi.mock('./DocPageNav.vue', () => ({ default: { template: '<nav />' } }));

let wrapper: VueWrapper | undefined;
let sidebarTop: number;
let mobile: boolean;
let contentHeight: number;
let notifyResize: () => void;
let frameId: number;
const frames = new Map<number, FrameRequestCallback>();
const disconnectObserver = vi.fn();
const scrollBy = vi.fn((options: ScrollToOptions) => {
  sidebarTop -= options.top ?? 0;
});

beforeEach(() => {
  sidebarTop = 69;
  mobile = false;
  contentHeight = 1500;
  frameId = 0;
  vi.stubGlobal('innerHeight', 720);
  vi.stubGlobal('scrollBy', scrollBy);
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    get matches() {
      return mobile;
    },
  })));
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
    frames.set(++frameId, callback);
    return frameId;
  });
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => {
    frames.delete(id);
  });
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    const top = this.id === 'docs-leftbar' ? sidebarTop : 0;
    const height = Number.parseFloat(this.style.height || '651');
    return { top, bottom: top + height, height } as DOMRect;
  });
  vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(() => contentHeight);
  vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(function (this: HTMLElement) {
    return Number.parseFloat(this.parentElement?.style.height || '720');
  });
  vi.stubGlobal('ResizeObserver', class {
    constructor(callback: () => void) {
      notifyResize = callback;
    }

    observe() {
    }

    disconnect() {
      disconnectObserver();
    }
  });
});

afterEach(() => {
  wrapper?.unmount();
  wrapper = undefined;
  frames.clear();
  document.body.replaceChildren();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

async function flushFrame() {
  const callbacks = [...frames.values()];
  frames.clear();
  for (const callback of callbacks) callback(0);
  await nextTick();
}

async function mountLoader() {
  wrapper = mount(DocLoader, { attachTo: document.body });
  await flushFrame();
  return {
    sidebar: wrapper.get<HTMLElement>('.LEFTBAR').element,
    sidebarWrapper: wrapper.get<HTMLElement>('#docs-leftbar').element,
  };
}

function wheel(deltaY: number, options: WheelEventInit = {}) {
  const event = new WheelEvent('wheel', { deltaY, cancelable: true, ...options });
  wrapper!.get('.LEFTBAR').element.dispatchEvent(event);
  return event;
}

describe('docs sidebar scrolling', () => {
  it('batches page, menu, resize, and observer updates and skips unchanged height writes', async () => {
    const { sidebar, sidebarWrapper } = await mountLoader();
    expect(sidebarWrapper.style.height).toBe('651px');
    const measure = vi.spyOn(sidebarWrapper, 'getBoundingClientRect');
    const setHeight = vi.spyOn(sidebarWrapper.style, 'height', 'set');

    sidebarTop = 0;
    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('resize'));
    sidebar.dispatchEvent(new Event('scroll'));
    notifyResize();
    expect(measure).not.toHaveBeenCalled();
    expect(frames.size).toBe(1);

    await flushFrame();
    expect(measure).toHaveBeenCalledOnce();
    expect(setHeight.mock.calls).toEqual([['720px']]);
    expect(measure.mock.invocationCallOrder[0]).toBeLessThan(setHeight.mock.invocationCallOrder[0]);
    await flushFrame();

    window.dispatchEvent(new Event('scroll'));
    await flushFrame();
    expect(setHeight).toHaveBeenCalledOnce();
    expect(frames.size).toBe(0);
  });

  it('keeps the footer fade and menu scroll cue in sync with measured geometry', async () => {
    sidebarTop = -100;
    const { sidebar } = await mountLoader();
    expect(wrapper!.find('.LEFTBARTEXTFADE').exists()).toBe(true);
    expect(wrapper!.find('.LEFTBARSCROLLCUE').exists()).toBe(true);

    sidebarTop = 0;
    sidebar.scrollTop = contentHeight - 720;
    window.dispatchEvent(new Event('scroll'));
    sidebar.dispatchEvent(new Event('scroll'));
    await flushFrame();
    expect(wrapper!.find('.LEFTBARTEXTFADE').exists()).toBe(false);
    expect(wrapper!.find('.LEFTBARSCROLLCUE').exists()).toBe(false);

    contentHeight += 100;
    notifyResize();
    await flushFrame();
    expect(wrapper!.find('.LEFTBARSCROLLCUE').exists()).toBe(true);
  });

  it('accumulates wheel input and reveals the sidebar before passing the remainder to the menu', async () => {
    sidebarTop = -100;
    const { sidebar, sidebarWrapper } = await mountLoader();
    sidebar.scrollTop = 300;
    const measure = vi.spyOn(sidebarWrapper, 'getBoundingClientRect');

    expect(wheel(-40).defaultPrevented).toBe(true);
    expect(wheel(-80).defaultPrevented).toBe(true);
    expect(wheel(-30).defaultPrevented).toBe(true);
    expect(measure).toHaveBeenCalledOnce();
    expect(scrollBy).not.toHaveBeenCalled();
    expect(sidebar.scrollTop).toBe(300);
    expect(frames.size).toBe(1);

    await flushFrame();
    expect(scrollBy.mock.calls).toEqual([[{ top: -100, behavior: 'instant' }]]);
    expect(sidebarTop).toBe(0);
    expect(sidebar.scrollTop).toBe(250);
    expect(wrapper!.find('.LEFTBARTEXTFADE').exists()).toBe(false);
    expect(wheel(-20).defaultPrevented).toBe(false);
  });

  it('leaves the menu position alone until the sidebar has been fully revealed', async () => {
    sidebarTop = -200;
    const { sidebar } = await mountLoader();
    sidebar.scrollTop = 300;
    wheel(-50);
    wheel(-30);
    await flushFrame();
    expect(scrollBy.mock.calls).toEqual([[{ top: -80, behavior: 'instant' }]]);
    expect(sidebarTop).toBe(-120);
    expect(sidebar.scrollTop).toBe(300);
  });

  it.each([
    [WheelEvent.DOM_DELTA_LINE, -2, -32],
    [WheelEvent.DOM_DELTA_PAGE, -1, -720],
  ])('preserves delta mode %s when batching wheel movement', async (deltaMode, deltaY, expected) => {
    sidebarTop = -1000;
    await mountLoader();
    wheel(deltaY, { deltaMode });
    await flushFrame();
    expect(scrollBy.mock.calls).toEqual([[{ top: expected, behavior: 'instant' }]]);
  });

  it('uses the current sidebar position if the document moves before queued wheel input runs', async () => {
    sidebarTop = -200;
    const { sidebar } = await mountLoader();
    sidebar.scrollTop = 300;
    wheel(-150);
    sidebarTop = -50;
    window.dispatchEvent(new Event('scroll'));
    await flushFrame();
    expect(scrollBy.mock.calls).toEqual([[{ top: -50, behavior: 'instant' }]]);
    expect(sidebar.scrollTop).toBe(200);
  });

  it('keeps native scrolling when fractional pixels leave the sidebar just above the viewport', async () => {
    sidebarTop = -0.125;
    await mountLoader();
    expect(wheel(-50).defaultPrevented).toBe(false);
    expect(frames.size).toBe(0);
    expect(scrollBy).not.toHaveBeenCalled();
  });

  it.each([
    [50, {}],
    [-50, { ctrlKey: true }],
    [-50, { cancelable: false }],
  ])('keeps native wheel handling for delta %s with options %o', async (deltaY, options) => {
    sidebarTop = -100;
    await mountLoader();
    expect(wheel(deltaY, options).defaultPrevented).toBe(false);
    expect(frames.size).toBe(0);
    expect(scrollBy).not.toHaveBeenCalled();
  });

  it('clears the desktop height and keeps mobile wheel handling native', async () => {
    sidebarTop = -100;
    const { sidebarWrapper } = await mountLoader();
    mobile = true;
    window.dispatchEvent(new Event('resize'));
    await flushFrame();
    await flushFrame();
    expect(sidebarWrapper.style.height).toBe('');
    expect(wrapper!.find('.LEFTBARTEXTFADE').exists()).toBe(false);
    expect(wheel(-50).defaultPrevented).toBe(false);
    expect(scrollBy).not.toHaveBeenCalled();
  });

  it('does not move the document if the viewport becomes mobile with wheel input queued', async () => {
    sidebarTop = -100;
    const { sidebar } = await mountLoader();
    sidebar.scrollTop = 300;
    wheel(-50);
    mobile = true;
    window.dispatchEvent(new Event('resize'));
    await flushFrame();
    expect(scrollBy).not.toHaveBeenCalled();
    expect(sidebar.scrollTop).toBe(250);
  });

  it('cancels pending wheel movement and removes observers and listeners on unmount', async () => {
    sidebarTop = -100;
    const { sidebar } = await mountLoader();
    wheel(-50);
    expect(frames.size).toBe(1);
    wrapper!.unmount();
    wrapper = undefined;
    expect(disconnectObserver).toHaveBeenCalledOnce();
    expect(frames.size).toBe(0);

    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('resize'));
    sidebar.dispatchEvent(new Event('scroll'));
    await flushFrame();
    expect(frames.size).toBe(0);
    expect(scrollBy).not.toHaveBeenCalled();
  });
});
