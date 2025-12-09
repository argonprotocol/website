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
      path: '/start',
      component: () => import('@/screens/start/Index.vue')
    },
    {
      path: '/playbook',
      component: () => import('@/screens/playbook/Index.vue')
    },
    {
      path: '/learn',
      component: () => import('./screens/learn/Index.vue')
    },
    {
      path: '/learn/whitepapers',
      component: () => import('./screens/learn/whitepapers/Index.vue')
    },
    {
      path: '/learn/currency-metrics/argons-in-circulation',
      component: () => import('./screens/learn/currency-metrics/ArgonsInCirculation.vue')
    },
    {
      path: '/learn/currency-metrics/argon-to-fiat-exchange-rate',
      component: () => import('./screens/learn/currency-metrics/ArgonToFiatExchangeRate.vue')
    },
    {
      path: '/learn/currency-metrics/bitcoin-to-argon-short-value',
      component: () => import('./screens/learn/currency-metrics/BitcoinToArgonShortValue.vue')
    },
    {
      path: '/learn/mining-metrics/active-mining-seats',
      component: () => import('./screens/learn/mining-metrics/ActiveMiningSeats.vue')
    },
    {
      path: '/learn/mining-metrics/current-mining-apy',
      component: () => import('./screens/learn/mining-metrics/CurrentMiningAPY.vue')
    },
    {
      path: '/learn/vaulting-metrics/active-vaults',
      component: () => import('./screens/learn/vaulting-metrics/ActiveVaults.vue')
    },
    {
      path: '/learn/vaulting-metrics/current-vaulting-apy',
      component: () => import('./screens/learn/vaulting-metrics/CurrentVaultingAPY.vue')
    },
    {
      path: '/learn/community',
      component: () => import('./screens/learn/community/Index.vue')
    },
    {
      path: '/learn/community/argonots',
      component: () => import('./screens/learn/community/Argonots.vue')
    },
    {
      path: '/learn/four-pillars',
      component: () => import('./screens/learn/four-pillars/Index.vue')
    },
    {
      path: '/learn/four-pillars/immunity-from-death-spirals',
      component: () => import('./screens/learn/four-pillars/ImmuneFromDeathSpirals.vue')
    },
    {
      path: '/learn/four-pillars/indifferent-to-catastrophe',
      component: () => import('./screens/learn/four-pillars/IndifferentToCatastrophe.vue')
    },
    {
      path: '/learn/four-pillars/resistant-to-inflation',
      component: () => import('./screens/learn/four-pillars/ResistantToInflation.vue')
    },
    {
      path: '/learn/four-pillars/intrinsic-price-stabilization',
      component: () => import('./screens/learn/four-pillars/IntrinsicPriceStabilization.vue')
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
