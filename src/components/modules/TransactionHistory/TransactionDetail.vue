<script setup lang="ts">
import { TransactionDetailColumns } from '@/option/columns';
import { StaticTable } from 'ts-mfe-console-vue-components';
import DetailCard from '@/components/common/DetailCard.vue';
import { computed, onMounted, ref, watch } from 'vue';
import FetchParams from '@/types/fetchParams.type';
import { getTransactionHistoryDetail } from '@/services/reader.service';

const props = defineProps<{
  id: string;
}>();

const currentTransaction = ref();
const fetchDetail = (params?: FetchParams) => {
  getTransactionHistoryDetail(props.id, params).then((res) => {
    currentTransaction.value = res?.data;
  });
};

onMounted(() => fetchDetail());

watch(currentTransaction, () => console.log(currentTransaction?.value));

const propItem = computed(() => ({
  image_name: currentTransaction?.value?.image,
  device_name: currentTransaction?.value?.name,
  sku: currentTransaction?.value?.sku,
  details: [
    {
      label: 'Category',
      value: currentTransaction?.value?.category,
      nameContainer: true,
    },
    {
      label: 'Brand',
      value: currentTransaction?.value?.brand,
      nameContainer: true,
    },
    {
      label: 'Model/Type',
      value: currentTransaction?.value?.model,
      nameContainer: true,
    },
    {
      label: 'Current Stock',
      value: currentTransaction?.value?.stock,
    },
  ],
}));

const dataDummy = [
  {
    _id: 'x',
    name: 'Name',
    hardwareId: 'FESFSDSSDSD',
    deviceId: 'FESFSDSSDSD',
  },
  {
    _id: 'x2',
    name: 'Name',
    hardwareId: 'FESFSDSSDSD',
    deviceId: 'FESFSDSSDSD',
  },
  {
    _id: 'x3',
    name: 'Name',
    hardwareId: 'FESFSDSSDSD',
    deviceId: 'FESFSDSSDSD',
  },
  {
    _id: 'x4',
    name: 'Name',
    hardwareId: 'FESFSDSSDSD',
    deviceId: 'FESFSDSSDSD',
  },
];

const columnDataDummy = dataDummy.map((item, index) => ({
  no: index + 1,
  ...item,
}));
</script>
<template>
  <DetailCard :item="propItem" />
  <div class="transaction__detail">
    <div>
      <div>
        <span>Transaction</span>
        <span>Partner / Client</span>
        <span>Qty</span>
      </div>
      <div>
        <span>: {{ currentTransaction?.lastTransaction }}</span>
        <span>: {{ currentTransaction?.company }}</span>
        <span>: {{ currentTransaction?.transactionQty }} Unit</span>
      </div>
    </div>
    <div>
      <div>
        <span>Date Time</span>
        <span>Manager</span>
      </div>
      <div>
        <span
          >:
          <DateText
            :date="currentTransaction?.transactionDate"
            style="display: inline"
            :useTime="true"
          />
        </span>
        <span>: {{ currentTransaction?.manager }}</span>
      </div>
    </div>
  </div>
  <StaticTable
    :datas="columnDataDummy"
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
