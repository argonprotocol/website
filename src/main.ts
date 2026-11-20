import './main.css';
import { createApp, createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const root = document.querySelector('#app');
const app = root?.hasAttribute('data-prerendered') ? createSSRApp(App) : createApp(App);

app.use(createPinia())
app.use(router)

router.isReady().then(() => app.mount('#app'));
