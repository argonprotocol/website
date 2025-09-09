import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './screens/Home.vue';
import MainnetView from './screens/start/Mainnet.vue';
import TestnetView from './screens/start/Testnet.vue';
import ArgonotsView from './screens/start/Argonots.vue';
import CommunityView from './screens/start/Community.vue';
import LearnView from './screens/learn/Index.vue';
import StartView from './screens/start/Index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
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
      path: '/learn/currency-metrics/argon-to-dollar-exchange-rate',
      component: () => import('./screens/learn/currency-metrics/ArgonToDollarExchangeRate.vue')
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
      component: () => import('./screens/learn/four-pillars/ImmunityFromDeathSpirals.vue')
    },
    {
      path: '/learn/four-pillars/full-stack-decentralization',
      component: () => import('./screens/learn/four-pillars/FullStackDecentralization.vue')
    },
    {
      path: '/learn/four-pillars/zero-inflation-money',
      component: () => import('./screens/learn/four-pillars/ZeroInflationMoney.vue')
    },
    {
      path: '/learn/four-pillars/exogenous-profit-incentives',
      component: () => import('./screens/learn/four-pillars/ExogenousProfitIncentives.vue')
    },
    {
      path: '/start',
      component: () => import('./screens/start/Index.vue')
    },
    {
      path: '/start/argonots',
      component: () => import('./screens/start/Argonots.vue')
    },
    {
      path: '/start/community',
      component: () => import('./screens/start/Community.vue')
    },
    {
      path: '/start/mainnet',
      component: () => import('./screens/start/Mainnet.vue')
    },
    {
      path: '/start/testnet',
      component: () => import('./screens/start/Testnet.vue')
    },
  ]
})

export default router
