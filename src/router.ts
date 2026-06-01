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
      path: '/apps/operations',
      component: () => import('@/screens/apps/Operations.vue')
    },
    {
      path: '/apps/treasury',
      component: () => import('@/screens/apps/Treasury.vue')
    },
    {
      path: '/operations-invite/:inviteCode',
      component: () => import('@/screens/OperationsInvite.vue')
    },
    {
      path: '/launch-plan',
      component: () => import('@/screens/launch-plan/Index.vue')
    },
    {
      path: '/docs/:id?/:subId?',
      component: () => import('@/screens/docs/DocLoader.vue')
    },
    {
      path: '/documentation',
      component: () => import('@/screens/documentation/Index.vue')
    },
    {
      path: '/documentation/from-uniswap',
      component: () => import('@/screens/documentation/FromUniswap.vue')
    },
    {
      path: '/mainnet',
      component: () => import('@/screens/Network.vue')
    },
    {
      path: '/testnet',
      component: () => import('@/screens/Network.vue')
    },
    {
      path: '/the-better-stablecoin',
      component: () => import('@/screens/the-better-stablecoin/Index.vue')
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 1) Browser back/forward: restore previous scroll
    if (savedPosition) return savedPosition

    // 2) Anchor links like /about#team
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }

    // 3) Default: jump to top on new vaulting
    return { left: 0, top: 0 }
  }
})

export default router
