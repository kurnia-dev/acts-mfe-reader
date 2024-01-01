<script setup lang="ts">
import useColumns from '@/option/columns';
import { ref, defineEmits, onMounted, reactive, watch } from 'vue';
import FilterButton from '@/components/FilterButton.vue';
import TableFilter from '../Filter/TableFilter.vue';
import { TableColumn } from '@/types/TableColumn';
import { MenuOption } from 'ts-mfe-console-vue-components/dist/types/options';
import TransactionDetail from './TransactionDetail.vue';
import { getTagStock } from '@/services/reader.service';
import FetchParams from '@/types/fetchParams.type';

defineEmits<{
  (e: 'set-selected-data', data: any): void;
  (e: 'select-data', data: any): void;
  (e: 'select-all', data: any): void;
  (e: 'page-change', data: any): void;
  (e: 'sort', data: any): void;
  (e: 'fetch-assets'): void;
}>();

const columns = useColumns();
const historyData = ref();
const historyColumns = columns.value.filter((col: TableColumn): boolean => {
  return col.field !== 'current_stock';
});

const fetchData = (params?: FetchParams) => {
  getTagStock(params).then((res) => {
    historyData.value = res?.data;
  });
};

onMounted(() => fetchData());

const _id = ref<string>();

const totalRecords = ref<number>(100);
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
const fetchParams = reactive<FetchParams>({});

const clearFilter = () => {
  for (const key of Object.keys(fetchParams) as (keyof typeof fetchParams)[]) {
    // Need to fix: delete fetchParams[key]
    // if the key is not keyof type FilterParams
    if (key !== 'search') delete fetchParams[key];
  }
};

const sortTable = (data: any) => {
  fetchParams.sortOrder = data.sortOrder;
  fetchParams.sortField = data.sortField;
};

watch(fetchParams, () => {
  fetchData(fetchParams);
});

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
  <div class="table-toolbar">
    <SearchButton
      v-model="query"
      @search="
        () => {
          fetchParams.search = query;
        }
      "
    />
    <FilterButton @toggleFilter="showFilter = !showFilter" />
  </div>
  <TableFilter
    v-if="showFilter"
    @hideFilter="showFilter = false"
    :filterList="filterList"
    :columnCount="4"
    @applyFilter="(params: any) => {
      fetchParams = Object.assign(fetchParams, params);
    }"
    @clearFilter="clearFilter"
  />
  <DynamicTable
    :columns="historyColumns"
    :datas="historyData"
    :rows="5"
    :totalRecords="totalRecords"
    :useOption="true"
    :options="options"
    @set-detail="(item: any) => {
      _id = item._id;
    }"
    @page="(data: any) => {
      fetchParams = Object.assign(fetchParams, {
        page: data.page + 1,
        limit: data.rows,
      })
    }"
    @sort="sortTable"
  />
  <Dialog v-model:visible="showDetail" modal header="Detail">
    <TransactionDetail :id="_id!" />
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
