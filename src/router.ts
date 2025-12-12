import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './screens/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/desktop-app',
      component: () => import('@/screens/desktop-app/Index.vue')
    },
    {
      path: '/secret-plan',
      component: () => import('@/screens/secret-plan/Index.vue')
    },
    {
      path: '/learn-more',
      component: () => import('@/screens/learn-more/Index.vue')
    },
    {
      path: '/mainnet',
      component: () => import('@/screens/Network.vue')
    },
    {
      path: '/testnet',
      component: () => import('@/screens/Network.vue')
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 1) Browser back/forward: restore previous scroll
    if (savedPosition) return savedPosition

    // 2) Anchor links like /about#team
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }

    // 3) Default: jump to top on new pages
    return { left: 0, top: 0 }
  }
})

export default router
