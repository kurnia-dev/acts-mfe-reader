<script setup lang="ts">
import { TransactionDetailColumns } from '@/option/columns';
import { StaticTable } from 'ts-mfe-console-vue-components';

defineProps<{
  transaction?: string;
  client?: string;
  qty?: number;
  date_time?: string;
  manager?: string;
}>();

const transactionDetail = {
  _id: 'x',
  transaction: 'Out',
  company: { _id: 'X', name: 'PT ABC', key: 1 },
  manager: { _id: 'X', name: 'JON', key: 1 },
  quantity: 2,
  createdAt: '2023-08-18T03:33:47.577Z',
  list: [
    {
      _id: 'x1',
      name: 'Handheld 1',
      hardwareId: 'FESSDSEFS',
      deviceId: 'FEDSDEGESD',
    },
    {
      _id: 'x2',
      name: 'Handheld 1',
      hardwareId: 'FESSDSEFS',
      deviceId: 'FEDSDEGESD',
    },
    {
      _id: 'x3',
      name: 'Handheld 1',
      hardwareId: 'FESSDSEFS',
      deviceId: 'FEDSDEGESD',
    },
  ],
};
const detailList = transactionDetail.list.map((item, index) => ({
  ...item,
  no: index + 1,
}));
</script>
<template>
  <div class="transaction__detail">
    <div>
      <div>
        <span>Transaction</span>
        <span>Partner / Client</span>
        <span>Qty</span>
      </div>
      <div>
        <span>: {{ transactionDetail.transaction }}</span>
        <span>: {{ transactionDetail.company.name }}</span>
        <span>: {{ transactionDetail.quantity }} Unit</span>
      </div>
    </div>
    <div>
      <div>
        <span>Date Time</span>
        <span>Manager</span>
      </div>
      <div>
        <span style="display: flex; gap: 2px">
          : <DateText :date="transactionDetail.createdAt" :useTime="true" />
        </span>
        <span>: {{ transactionDetail.manager.name }}</span>
      </div>
    </div>
  </div>
  <StaticTable
    :datas="detailList"
    :columns="TransactionDetailColumns"
    dataKey="_id"
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
