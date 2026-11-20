import { createSSRApp, Fragment, h } from 'vue';
import { createMemoryHistory, createRouter, RouterView } from 'vue-router';
import { renderToString } from 'vue/server-renderer';
import PageMetadata from './PageMetadata.vue';
import Explainer from './screens/why-its-better/Index.vue';

export async function renderExplainer() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/why-its-better', component: Explainer }],
  });
  await router.push('/why-its-better');
  await router.isReady();

  // Match App.vue's root without importing pages that require live network data.
  const app = createSSRApp({
    render() {
      return h(Fragment, [h(PageMetadata), h(RouterView)]);
    },
  });
  app.use(router);

  const metadata = createSSRApp(PageMetadata, { prerender: true });
  metadata.use(router);

  return {
    html: await renderToString(app),
    head: await renderToString(metadata),
  };
}
