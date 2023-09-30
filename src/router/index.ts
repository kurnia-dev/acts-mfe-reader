import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/reader',
    name: 'reader',
    component: () => import('@/layout/ReaderLayout.vue'),
    redirect: { name: 'stock' },
    children: [
      {
        path: '/reader/stock',
        name: 'stock',
        component: () => import('@/components/modules/Stock/StockTable.vue'),
      },
      {
        path: '/reader/transaction-history',
        name: 'transaction-history',
        component: () =>
          import(
            '@/components/modules/TransactionHistory/TransactionHistory.vue'
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
