<script setup lang="ts">
import useColumns from '@/option/columns';
import { ref, computed, defineEmits } from 'vue';
import FilterButton from '@/components/FilterButton.vue';
import TableFilter from '../Filter/TableFilter.vue';
import { TableColumn } from '@/types/TableColumn';
import { MenuOption } from 'ts-mfe-console-vue-components/dist/types/options';
import TransactionDetail from './TransactionDetail.vue';

defineEmits<{
  (e: 'set-selected-data', data: any): void;
  (e: 'select-data', data: any): void;
  (e: 'select-all', data: any): void;
  (e: 'page-change', data: any): void;
  (e: 'sort', data: any): void;
  (e: 'fetch-assets'): void;
}>();

const columns = useColumns();
const historyColumns = columns.value.filter((col: TableColumn): boolean => {
  return col.field !== 'current_stock';
});

const historyData = ref([
  {
    image:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    name: 'Handheld Reader 1',
    sku: 'TS-TAGREG-001',
    category: 'Short Range',
    brand: 'TAG Samurai 1',
    model: 'TGS-31',
    // current_stock: 5,
    lastTransaction: 'In',
    transactionQty: 2,
    company: 'Client A',
    manager: 'Manager X',
    transactionDate: '2023-09-14',
  },
  {
    image:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    name: 'Handheld Reader 2',
    sku: 'TS-TAGREG-002',
    category: 'Short Range',
    brand: 'TAG Samurai 2',
    model: 'TGS-32',
    // current_stock: 3,
    lastTransaction: 'Out',
    transactionQty: 1,
    company: 'Client B',
    manager: 'Manager Y',
    transactionDate: '2023-09-15',
  },
  {
    image:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    name: 'Handheld Reader 3',
    sku: 'TS-TAGREG-003',
    category: 'Long Range',
    brand: 'TAG Samurai 3',
    model: 'TGS-33',
    // current_stock: 8,
    lastTransaction: 'In',
    transactionQty: 4,
    company: 'Client C',
    manager: 'Manager Z',
    transactionDate: '2023-09-16',
  },
  {
    image:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    name: 'Handheld Reader 4',
    sku: 'TS-TAGREG-004',
    category: 'Long Range',
    brand: 'TAG Samurai 4',
    model: 'TGS-34',
    // current_stock: 6,
    lastTransaction: 'Out',
    transactionQty: 2,
    company: 'Client D',
    manager: 'Manager W',
    transactionDate: '2023-09-17',
  },
  {
    image:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    name: 'Handheld Reader 5',
    sku: 'TS-TAGREG-005',
    category: 'Short Range',
    brand: 'TAG Samurai 5',
    model: 'TGS-35',
    // current_stock: 4,
    lastTransaction: 'In',
    transactionQty: 3,
    company: 'Client E',
    manager: 'Manager V',
    transactionDate: '2023-09-18',
  },
  {
    image:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    name: 'IOT Reader 6',
    sku: 'TS-TAGREG-006',
    category: 'Short Range',
    brand: 'TAG Samurai 6',
    model: 'TGS-36',
    // current_stock: 7,
    lastTransaction: 'Out',
    transactionQty: 2,
    company: 'Client F',
    manager: 'Manager U',
    transactionDate: '2023-09-19',
  },
  {
    image:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    name: 'IOT Reader 7',
    sku: 'TS-TAGREG-007',
    category: 'Long Range',
    brand: 'TAG Samurai 7',
    model: 'TGS-37',
    // current_stock: 5,
    lastTransaction: 'In',
    transactionQty: 3,
    company: 'Client G',
    manager: 'Manager T',
    transactionDate: '2023-09-20',
  },
  {
    image:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    name: 'IOT Reader 8',
    sku: 'TS-TAGREG-008',
    category: 'IOT',
    brand: 'TAG Samurai 8',
    model: 'TGS-38',
    // current_stock: 10,
    lastTransaction: 'Out',
    transactionQty: 2,
    company: 'Client H',
    manager: 'Manager S',
    transactionDate: '2023-09-21',
  },
  {
    image:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    name: 'IOT Reader 9',
    sku: 'TS-TAGREG-009',
    category: 'IOT',
    brand: 'TAG Samurai 9',
    model: 'TGS-39',
    // current_stock: 3,
    lastTransaction: 'In',
    transactionQty: 1,
    company: 'Client I',
    manager: 'Manager R',
    transactionDate: '2023-09-22',
  },
  {
    image:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    name: 'IOT Reader 10',
    sku: 'TS-TAGREG-010',
    category: 'Short Range',
    brand: 'TAG Samurai 10',
    model: 'TGS-40',
    // current_stock: 6,
    lastTransaction: 'Out',
    transactionQty: 4,
    company: 'Client J',
    manager: 'Manager Q',
    transactionDate: '2023-09-23',
  },
]);

const totalRecords = computed(() => historyData.value.length);
const showFilter = ref<boolean>(false);

const filterList = [
  'image',
  'name',
  'sku',
  'category',
  'brand',
  'model',
  'lastTransaction',
  'transactionQty',
  'company',
  'manager',
  'transactionDate',
];

const query = ref<string>();
const searchHistory = () => {
  console.log(query.value);
};

const showDetail = ref<boolean>(false);

const options = ref<MenuOption[]>([
  {
    label: 'Detail',
    icon: 'ri-file-info-line',
    command: () => {
      showDetail.value = true;
    },
  },
]);
</script>
<template>
  <div class="table__toolbar">
    <ButtonScanRFID />
    <SearchButton @search="searchHistory" v-model="query" />
    <FilterButton @toggleFilter="showFilter = !showFilter" />
    <DownloadButton />
  </div>
  <TableFilter
    v-if="showFilter"
    @hideFilter="showFilter = false"
    :filterList="filterList"
    :columnCount="4"
  />
  <DynamicTable
    :columns="historyColumns"
    :datas="historyData"
    :rows="5"
    :totalRecords="totalRecords"
    :useOption="true"
    :options="options"
    @page="$emit('page-change', $event)"
    @sort="$emit('sort', $event)"
  />
  <Dialog v-model:visible="showDetail" modal header="Detail">
    <TransactionDetail />
    <template #footer>
      <Button
        severity="primary"
        label="Close"
        @click="showDetail = false"
        class="primary-outlined"
      />
    </template>
  </Dialog>
</template>
