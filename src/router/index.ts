import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ManifestoView from '../views/ManifestoView.vue';
import MainnetView from '../views/Mainnet.vue';
import TestnetView from '../views/Testnet.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/manifesto',
      name: 'manifesto',
      component: ManifestoView
    },
    {
      path: '/mainnet',
      name: 'mainnet',
      component: MainnetView
    },
    {
      path: '/testnet',
      name: 'testnet',
      component: TestnetView
    },
  ]
})

export default router
