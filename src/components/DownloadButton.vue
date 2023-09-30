<script setup lang="ts">
import { useStore } from 'vuex';
import { exportToExcel } from '@/utils';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const stock = [
  {
    photo:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    device_name: 'Tag RFID 1',
    sku: 'TS-TAGREG-001',
    category: 'regular',
    brand: 'TAG Samurai 1',
    model: 'TGS-31',
    current_stock: 5,
    last_transaction: 'In',
    transaction_qty: 2,
    client: 'Client A',
    manager: 'Manager X',
    transaction_date: '2023-09-14',
  },
  {
    photo:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    device_name: 'Tag RFID 2',
    sku: 'TS-TAGREG-002',
    category: 'regular',
    brand: 'TAG Samurai 2',
    model: 'TGS-32',
    current_stock: 3,
    last_transaction: 'Out',
    transaction_qty: 1,
    client: 'Client B',
    manager: 'Manager Y',
    transaction_date: '2023-09-15',
  },
  {
    photo:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    device_name: 'Tag RFID 3',
    sku: 'TS-TAGREG-003',
    category: 'premium',
    brand: 'TAG Samurai 3',
    model: 'TGS-33',
    current_stock: 8,
    last_transaction: 'In',
    transaction_qty: 4,
    client: 'Client C',
    manager: 'Manager Z',
    transaction_date: '2023-09-16',
  },
  {
    photo:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    device_name: 'Tag RFID 4',
    sku: 'TS-TAGREG-004',
    category: 'premium',
    brand: 'TAG Samurai 4',
    model: 'TGS-34',
    current_stock: 6,
    last_transaction: 'Out',
    transaction_qty: 2,
    client: 'Client D',
    manager: 'Manager W',
    transaction_date: '2023-09-17',
  },
  {
    photo:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    device_name: 'Tag RFID 5',
    sku: 'TS-TAGREG-005',
    category: 'regular',
    brand: 'TAG Samurai 5',
    model: 'TGS-35',
    current_stock: 4,
    last_transaction: 'In',
    transaction_qty: 3,
    client: 'Client E',
    manager: 'Manager V',
    transaction_date: '2023-09-18',
  },
  {
    photo:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    device_name: 'Tag RFID 6',
    sku: 'TS-TAGREG-006',
    category: 'regular',
    brand: 'TAG Samurai 6',
    model: 'TGS-36',
    current_stock: 7,
    last_transaction: 'Out',
    transaction_qty: 2,
    client: 'Client F',
    manager: 'Manager U',
    transaction_date: '2023-09-19',
  },
  {
    photo:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    device_name: 'Tag RFID 7',
    sku: 'TS-TAGREG-007',
    category: 'premium',
    brand: 'TAG Samurai 7',
    model: 'TGS-37',
    current_stock: 5,
    last_transaction: 'In',
    transaction_qty: 3,
    client: 'Client G',
    manager: 'Manager T',
    transaction_date: '2023-09-20',
  },
  {
    photo:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    device_name: 'Tag RFID 8',
    sku: 'TS-TAGREG-008',
    category: 'premium',
    brand: 'TAG Samurai 8',
    model: 'TGS-38',
    current_stock: 10,
    last_transaction: 'Out',
    transaction_qty: 2,
    client: 'Client H',
    manager: 'Manager S',
    transaction_date: '2023-09-21',
  },
  {
    photo:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    device_name: 'Tag RFID 9',
    sku: 'TS-TAGREG-009',
    category: 'regular',
    brand: 'TAG Samurai 9',
    model: 'TGS-39',
    current_stock: 3,
    last_transaction: 'In',
    transaction_qty: 1,
    client: 'Client I',
    manager: 'Manager R',
    transaction_date: '2023-09-22',
  },
  {
    photo:
      'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
    device_name: 'Tag RFID 10',
    sku: 'TS-TAGREG-010',
    category: 'regular',
    brand: 'TAG Samurai 10',
    model: 'TGS-40',
    current_stock: 6,
    last_transaction: 'Out',
    transaction_qty: 4,
    client: 'Client J',
    manager: 'Manager Q',
    transaction_date: '2023-09-23',
  },
];

const store = useStore();
const exportExcel = async () => {
  try {
    store.commit('LOADING', true);
    // const headers = columns.value.map((column: TableColumn) => column.header);
    const headers = [
      'device_name',
      'sku',
      'category',
      'brand',
      'model',
      'current_stock',
      'last_transaction',
      'transaction_qty',
      'client',
      'manager',
      'transaction_date',
    ];
    // const newParams = {
    //   ...paramQuery.value,
    //   limit: undefined,
    //   page: undefined,
    // };
    // const response = await ServiceCenterAPIs.getServiceCenterList(newParams);
    const response = {
      data: stock,
    };

    if (response.data) {
      const data = response.data.map((data) => ({
        device_name: data.device_name,
        sku: data.sku,
        category: data.category,
        brand: data.brand,
        model: data.model,
        current_stock: data.current_stock,
        last_transaction: data.last_transaction,
        transaction_qty: data.transaction_qty,
        client: data.client,
        manager: data.manager,
        transaction_date: data.transaction_date,
      }));
      exportToExcel({
        headers,
        filename: 'rfid_tags_stock'.toLowerCase(),
        data,
      });
    }
  } catch (error) {
    console.error(error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: "There's some errors while exporting to excel file!",
      life: 3000,
    });
  } finally {
    store.commit('LOADING', false);
  }
};
</script>
<template>
  <Button
    outlined
    icon="ri-download-2-line"
    severity="success"
    @click="exportExcel"
  />
</template>
