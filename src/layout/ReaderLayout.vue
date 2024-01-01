<script setup lang="ts">
import { ref } from 'vue';

const menus = ref([
  {
    label: 'Stock',
    to: '/reader/stock',
  },
  {
    label: 'Transaction History',
    to: '/reader/transaction-history',
  },
]);
</script>

<template>
  <Card>
    <template #content>
      <TabMenu :model="menus" :exact="false" />
      <router-view />
    </template>
  </Card>
</template>
