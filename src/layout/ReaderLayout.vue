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
      <div
        style="
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 10px;
        "
      >
        <router-view />
      </div>
    </template>
  </Card>
</template>
