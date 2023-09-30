<script lang="ts" setup>
import { ref, computed, watch, reactive } from 'vue';
import { MenuOption } from 'ts-mfe-console-vue-components/dist/types/options';
import useColumns from '@/option/columns';
import FilterButton from '@/components/FilterButton.vue';
import DownloadButton from '@/components/DownloadButton.vue';
import ButtonScanQR from '@/components/ButtonScanQR.vue';
import TableFilter from '@/components/modules/Filter/TableFilter.vue';
import StockDetail from './StockDetail.vue';
import AddReaderStockDialog from '@/components/modules/AddReaderStock/AddReaderStockDialog.vue';

import { useStore } from 'vuex';
const store = useStore();
const columns = useColumns();
const stock = ref();
const totalRecords = ref<number>(100);

const fetchData = (params?: FetchParams) => {
  fetchAPI('/v2/_id', params).then((res) => {
    stock.value = res?.data;
  });
};

fetchData();

/**
 * To store the item's _id on set-detail event
 */
const _id = ref<string>('');

const options = ref<MenuOption[]>([
  {
    label: 'Add Stock',
    icon: 'ri-add-line',
    command: () => {
      store.commit('TOGGLE_SHOWADDQR', true);
    },
  },
  {
    label: 'Detail',
    icon: 'ri-file-info-line',
    command: () => {
      showDetail.value = true;
    },
  },
]);

const showFilter = ref<boolean>(false);
const showDetail = ref<boolean>(false);

import { AllFilter } from '@/types/filterList.type';
import { fetchAPI } from '@/services/reader.service';
import FetchParams from '@/types/fetchParams.type';

const showAddQR = ref<boolean>(false);
const showAddQRState = computed(() => store.state.showAddQR);

watch(showAddQRState, () => {
  showAddQR.value = store.state.showAddQR;
});

watch(showAddQR, () => {
  store.commit('TOGGLE_SHOWADDQR', showAddQR.value);
});

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

const scan = (res: any) => console.log(res);
</script>
<template>
  <div class="table__toolbar">
    <ButtonScanQR @scan="scan" />
    <SearchButton
      v-model="query"
      @search="
        () => {
          fetchParams.search = query;
        }
      "
    />
    <FilterButton @toggleFilter="showFilter = !showFilter" />
    <DownloadButton />
  </div>
  <TableFilter
    v-show="showFilter"
    @hideFilter="showFilter = false"
    :filterList="AllFilter"
    :columnCount="4"
    @applyFilter="(params: any) => {
      fetchParams = Object.assign(fetchParams, params);
    }"
    @clearFilter="clearFilter"
  />
  <DynamicTable
    :columns="columns"
    :datas="stock"
    dataKey="_id"
    :rows="5"
    :totalRecords="totalRecords"
    :useOption="true"
    :options="options"
    @page="(data: any) => {
      fetchParams = Object.assign(fetchParams, {
        page: data.page + 1,
        limit: data.rows,
      })
    }"
    @sort="sortTable"
    @set-detail="(item: any) => {
      _id = item._id;
    }"
  />

  <Dialog v-model:visible="showDetail" modal header="Stock Detail">
    <StockDetail :id="_id" />
    <template #footer>
      <Button
        severity="primary"
        label="Close"
        @click="showDetail = false"
        class="primary-outlined"
      />
    </template>
  </Dialog>
  <Dialog v-model:visible="showAddQR" modal header="Add Reader Stock">
    <AddReaderStockDialog :id="_id" />
  </Dialog>
</template>
<style scoped lang="scss">
@import '~scss/index.scss';
.p-column-title {
  width: max-content !important;
}
</style>
