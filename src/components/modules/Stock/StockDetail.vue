<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { MenuOption } from 'ts-mfe-console-vue-components/dist/types/options';
import { StaticTable } from 'ts-mfe-console-vue-components';
import TransactionDetail from './DetailTransactionHistory/TransactionDetail.vue';
import SetReadDistance from './DetailCurrentStock/SetReadDistance.vue';
import FilterButton from '@/components/FilterButton.vue';
import CurrentStockFilter from './DetailCurrentStock/Filter.vue';
import HistoryFilter from './DetailTransactionHistory//Filter.vue';
import DetailCard from '@/components/common/DetailCard.vue';

const props = defineProps<{
  id: string;
}>();

import {
  CurrentStockDetailColumns,
  StockDetailHistoryColumns,
} from '@/option/columns';
import { getStockDetail } from '@/services/reader.service';
import FetchParams from '@/types/fetchParams.type';

const showStockFilter = ref<boolean>(false);
const showHistoryFilter = ref<boolean>(false);

const historyData = [
  {
    lastTransaction: 'Out',
    transactionQty: 2,
    company: 'Client H',
    transactionDate: '12/2/2022',
    manager: 'John Doe',
  },
  {
    lastTransaction: 'Out',
    transactionQty: 2,
    company: 'Client H',
    transactionDate: '12/2/2022',
    manager: 'John Doe',
  },
  {
    lastTransaction: 'Out',
    transactionQty: 2,
    company: 'Client H',
    transactionDate: '12/2/2022',
    manager: 'John Doe',
  },
];

const showTransactionDetail = ref<boolean>(false);
const showSetReadDistance = ref<boolean>(false);

const readDistanceDisabled = ref<boolean>(false);
const onOptionOpen = (data: any) => {
  readDistanceDisabled.value = !!data.readDistance;
};
/**
 * Note:
 * untuk sku yang di enable read distance setting ny,
 * maka disini bisa ada action set read distance
 */

const currentStockOption = ref<MenuOption[]>([
  {
    label: 'Set Read Distance',
    icon: 'ri-wifi-line',
    command: () => {
      showSetReadDistance.value = true;
    },
    disabled: readDistanceDisabled.value, // not work
  },
]);

const historyOption = ref<MenuOption[]>([
  {
    label: 'Detail',
    icon: 'ri-file-info-line',
    command: () => {
      showTransactionDetail.value = true;
    },
  },
]);

const stockDummy = [
  {
    _id: 'x',
    name: 'Name',
    hardwareId: 'FESFSDSSDSD',
    deviceId: 'FESFSDSSDSD',
    readDistance: 'Long Range',
  },
  {
    _id: 'x2',
    name: 'Name',
    hardwareId: 'FESFSDSSDSD',
    deviceId: 'FESFSDSSDSD',
    readDistance: 'Long Range',
  },
  {
    _id: 'x3',
    name: 'Name',
    hardwareId: 'FESFSDSSDSD',
    deviceId: 'FESFSDSSDSD',
    readDistance: 'Long Range',
  },
  {
    _id: 'x4',
    name: 'Name',
    hardwareId: 'FESFSDSSDSD',
    deviceId: 'FESFSDSSDSD',
    readDistance: 'Long Range',
  },
];

const currentStockDetailDatas = stockDummy.map((item, index) => ({
  no: index + 1,
  ...item,
}));

const queryStock = ref<string>();
const fetchParamsStock = reactive<FetchParams>({});

const queryHistory = ref<string>();
const fetchParamsHistory = reactive<FetchParams>({});

const clearFilter = (filterObject: FetchParams) => {
  for (const key of Object.keys(
    filterObject
  ) as (keyof typeof filterObject)[]) {
    // Need to fix: delete fetchParams[key]
    // if the key is not keyof type FilterParams
    if (key !== 'search') delete filterObject[key];
  }
};

const currentItem = ref();
const fetchDetail = (params?: FetchParams) => {
  getStockDetail(props.id, params).then((res) => {
    currentItem.value = res?.data;
  });
};

onMounted(() => fetchDetail());
/**
 * Object contains detailed information about the tag
 * passed into detailCard component.
 */
const propItem = computed(() => ({
  image_name: currentItem.value?.image,
  device_name: currentItem.value?.name,
  sku: currentItem.value?.sku,
  details: [
    {
      label: 'Category',
      value: currentItem.value?.category,
      nameContainer: true,
    },
    {
      label: 'Brand',
      value: currentItem.value?.brand,
      nameContainer: true,
    },
    {
      label: 'Model/Type',
      value: currentItem.value?.model,
      nameContainer: true,
    },
    {
      label: 'Current Stock',
      value: currentItem.value?.stock,
    },
  ],
}));
</script>
<template>
  <div class="details_container">
    <DetailCard :item="propItem" />
    <TabView>
      <TabPanel header="Current Stock">
        <div class="table-toolbar">
          <SearchButton
            @search="
              () => {
                fetchParamsStock.search = queryStock;
                console.log(fetchParamsStock);
              }
            "
            v-model="queryStock"
          />
          <FilterButton @toggleFilter="showStockFilter = !showStockFilter" />
        </div>
        <CurrentStockFilter
          v-show="showStockFilter"
          @clearFilter="clearFilter(fetchParamsStock)"
          @applyFilter="(params: any) => {
            fetchParamsStock = 
              Object.assign(fetchParamsStock, params);

            console.log(fetchParamsStock);
          }"
        />
        <StaticTable
          :columns="CurrentStockDetailColumns"
          dataKey="deviceId"
          :datas="currentStockDetailDatas"
          :useOption="true"
          :options="currentStockOption"
          :rows="5"
          @select-data="onOptionOpen"
        />
      </TabPanel>
      <TabPanel header="Transaction History">
        <div class="table-toolbar">
          <SearchButton
            @search="
              () => {
                fetchParamsHistory.search = queryHistory;
                console.log(fetchParamsHistory);
              }
            "
            v-model="queryHistory"
          />
          <FilterButton
            @toggleFilter="showHistoryFilter = !showHistoryFilter"
          />
        </div>
        <HistoryFilter
          v-show="showHistoryFilter"
          @clearFilter="clearFilter(fetchParamsHistory)"
          @applyFilter="(params: any) => {
            fetchParamsHistory = 
              Object.assign(fetchParamsHistory, params);

            console.log(fetchParamsHistory);
          }"
        />
        <StaticTable
          :columns="StockDetailHistoryColumns"
          dataKey="transactionDate"
          :datas="historyData"
          :useOption="true"
          :options="historyOption"
          :rows="5"
        />
      </TabPanel>
    </TabView>

    <Dialog modal v-model:visible="showTransactionDetail" header="Detail">
      <TransactionDetail />
      <template #footer>
        <Button
          label="Close"
          severity="primary"
          outlined
          class="primary-outlined"
          @click="showTransactionDetail = false"
        />
      </template>
    </Dialog>
    <Dialog
      modal
      v-model:visible="showSetReadDistance"
      header="Set Reader Distance"
    >
      <SetReadDistance @closeDialog="showSetReadDistance = false" />
    </Dialog>
  </div>
</template>
<style lang="scss">
@import '~scss/index.scss';
img {
  width: 125px;
  height: 125px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 8px;
}

.details_container {
  min-width: 544px;
  max-width: 544px;
  .details_wrapper {
    display: flex;
    gap: 18px;
    margin-bottom: 12px;
  }
  .details {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 6px;
    .details__name {
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px; /* 171.429% */
      letter-spacing: -0.28px;
    }

    .details__model_name,
    .details__stock_info {
      color: $general-label;
      font-size: 11.2px;
      font-style: normal;
      font-weight: 500;
      line-height: 16.8px; /* 150% */
      letter-spacing: 0.224px;
    }
  }
}

.column {
  display: flex;
  align-items: center;
  flex: 1;
}

.key {
  flex: 1;
  max-width: 64px;
}

.separator {
  margin: 0 12px;
}

.p-tabview-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
