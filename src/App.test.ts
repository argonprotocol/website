import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils';
import { createMemoryHistory, createRouter } from 'vue-router';
import { createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import App from './App.vue';
import MenuMobile from './navigation/MenuMobile.vue';
import siteRouter from './router';
import Data from './lib/Data';

vi.mock('./lib/Data', () => ({ default: { load: vi.fn().mockRejectedValue(new Error('Network unavailable')) } }));
vi.mock('./screens/Home.vue', () => ({ default: { template: '<h1>Home</h1>' } }));
vi.mock('./screens/why-its-better/Index.vue', () => ({ default: { template: '<h1>The Better Stablecoin</h1>' } }));
vi.mock('./screens/trade/Index.vue', () => ({ default: { template: '<h1>Trade</h1>' } }));

let wrapper: VueWrapper | undefined;

beforeEach(() => {
  vi.clearAllMocks();
  document.head.innerHTML = '<title>Argon - The Better Stablecoin</title>';
});

afterEach(() => {
  wrapper?.unmount();
  wrapper = undefined;
  document.head.innerHTML = '';
});

async function openPage(path: string) {
  const router = createRouter({ history: createMemoryHistory(), routes: siteRouter.options.routes });
  await router.push(path);
  await router.isReady();
  wrapper = mount(App, { global: { plugins: [router] } });
  await flushPromises();
  return router;
}

describe('explainer availability and page metadata', () => {
  it('hydrates the mobile menu without consuming the app container', async () => {
    const router = createRouter({ history: createMemoryHistory(), routes: siteRouter.options.routes });
    await router.push('/why-its-better');
    await router.isReady();
    const context: { teleports?: Record<string, string> } = {};
    const html = await renderToString(createSSRApp(MenuMobile).use(router), context);
    expect(context.teleports?.body).toBeUndefined();

    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.append(container);
    const app = createSSRApp(MenuMobile).use(router);
    try {
      app.mount(container);
      await flushPromises();
      expect(document.body.contains(container)).toBe(true);
      container.querySelector('.MobileMenuIconButton svg')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await flushPromises();
      expect(document.body.querySelector('.MobileMenuNetworkButton--open')).not.toBeNull();
    } finally {
      app.unmount();
      container.remove();
    }
  });

  it('renders directly without requesting network basics', async () => {
    await openPage('/why-its-better');
    expect(Data.load).not.toHaveBeenCalled();
    expect(wrapper?.find('h1').text()).toBe('The Better Stablecoin');
    expect(document.title).toBe('The Better Stablecoin | Argon');
    expect(document.head.querySelectorAll('title')).toHaveLength(1);
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'))
      .toBe('https://argon.network/why-its-better');
    expect(document.head.querySelector('meta[name="description"]')?.getAttribute('content'))
      .toContain('inflation');
  });

  it('stays readable after a network-basics failure and updates metadata during navigation', async () => {
    const router = await openPage('/');
    expect(Data.load).toHaveBeenCalledOnce();
    expect(wrapper?.text()).toContain('Unable to load the latest network data.');

    await router.push('/why-its-better');
    await flushPromises();
    expect(wrapper?.find('h1').text()).toBe('The Better Stablecoin');
    expect(document.title).toBe('The Better Stablecoin | Argon');

    await router.push('/trade/');
    await flushPromises();
    expect(document.head.querySelector('meta[name="robots"]')?.getAttribute('content')).toContain('noindex');
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.title).toBe('Argon - The Better Stablecoin');

    await router.push('/why-its-better');
    await flushPromises();
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull();
    expect(document.title).toBe('The Better Stablecoin | Argon');

    await router.push('/');
    await flushPromises();
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.head.querySelector('meta[name="description"]')).toBeNull();
    expect(document.title).toBe('Argon - The Better Stablecoin');
  });
});
