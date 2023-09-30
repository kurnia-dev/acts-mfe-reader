<script setup lang="ts">
import { TransactionDetailColumns } from '@/option/columns';
import { StaticTable } from 'ts-mfe-console-vue-components';
import DetailCard from '@/components/common/DetailCard.vue';

defineProps<{
  transaction?: string;
  client?: string;
  qty?: number;
  date_time?: string;
  manager?: string;
}>();

const transactionDetailData = [
  {
    no: 1,
    device_name: 'Handled Reader',
    hardware_id: 'Client H',
    device_id: 'FESFSD323',
  },
  {
    no: 2,
    device_name: 'Handled Reader',
    hardware_id: 'Client H',
    device_id: 'FESFSD323',
  },
  {
    no: 3,
    device_name: 'Handled Reader',
    hardware_id: 'Client H',
    device_id: 'FESFSD323',
  },
];

const item = {
  image_name: '',
  device_name: 'Handheld Reader',
  sku: 'TS-HNDSR-002',
  details: [
    {
      label: 'Category',
      value: 'Short range',
      nameContainer: true,
    },
    {
      label: 'Brand',
      value: 'TAG Samurai',
      nameContainer: true,
    },
    {
      label: 'Model/Type',
      value: 'RD2',
      nameContainer: true,
    },
    {
      label: 'Current Stock',
      value: 10,
    },
  ],
};
</script>
<template>
  <DetailCard :item="item" />
  <div class="transaction__detail">
    <div>
      <div>
        <span>Transaction</span>
        <span>Partner / Client</span>
        <span>Qty</span>
      </div>
      <div>
        <span>: Out</span>
        <span>: PT ABC</span>
        <span>: 10 Unit</span>
      </div>
    </div>
    <div>
      <div>
        <span>Date Time</span>
        <span>Manager</span>
      </div>
      <div>
        <span>: 22/03/23 13:00</span>
        <span>: John Doe</span>
      </div>
    </div>
  </div>
  <StaticTable
    :datas="transactionDetailData"
    :columns="TransactionDetailColumns"
    dataKey="device_id"
    :rows="5"
  />
</template>
<style lang="scss">
.transaction__detail {
  display: flex;
  gap: 20px;
  margin-bottom: 12px;
  color: #4e4b66;

  > div {
    display: flex;

    > div {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: max-content;
      margin-right: 4px;

      span {
        display: block;
        color: #6e7191;
      }
    }
  }
}
</style>
