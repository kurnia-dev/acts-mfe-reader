<script lang="ts" setup>
import { ref, computed, watch, reactive } from 'vue';
import { MenuOption } from 'ts-mfe-console-vue-components/dist/types/options';
import useColumns from '@/option/columns';
import FilterButton from '@/components/FilterButton.vue';
import TableFilter from '@/components/modules/Filter/TableFilter.vue';
import StockDetail from './StockDetail.vue';
import AddReaderStockDialog from '@/components/modules/AddReaderStock/AddReaderStockDialog.vue';

import { useStore } from 'vuex';
const store = useStore();
const columns = useColumns();
const stock = ref();
const totalRecords = ref<number>(0);
const toast = useToast();

const fetchData = (params?: FetchParams, isScan?: boolean) => {
  getTagStock(params).then((res) => {
    stock.value = res?.data;
    totalRecords.value = res?.data.length;
    if (isScan && totalRecords.value === 0) {
      toast.add({
        severity: 'error',
        detail: 'Asset not found',
        life: 3000,
      });
    }
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
import { getTagStock, getAllData } from '@/services/reader.service';
import FetchParams from '@/types/fetchParams.type';
import { useToast } from 'primevue/usetoast';
import { AxiosError } from 'axios';
import { TableColumn } from '@/types/TableColumn';
import { exportToExcel } from '@/utils';

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

const onScanQR = (qr: string) => {
  fetchParams.qrTag = qr;
  fetchData(fetchParams, true);
};

const exportExcel = async () => {
  try {
    store.commit('LOADING', true);
    const headers = columns.value.map((column: TableColumn) => column.header);
    const response = await getAllData('/v2/_id');
    if (response?.status === 200) {
      const data = response.data.map((data: any) => ({
        image: data.image,
        name: data.name,
        sku: data.sku,
        category: data.category,
        brand: data.brand,
        model: data.model,
        stock: data.stock,
        lastTransaction: data.lastTransaction,
        transactionQty: data.transactionQty,
        company: data.company,
        manager: data.manager,
        transactionDate: data.transactionDate,
      }));

      exportToExcel({
        headers,
        filename: 'qrTag_stock',
        data,
      });
    }
  } catch (error) {
    const errorMessage =
      (error as AxiosError).code === 'ERR_BAD_REQUEST'
        ? 'Error, failed to download the asset from the available list. Please check your internet connection.'
        : 'Error, failed to download the asset from the available list.';

    toast.add({
      severity: 'error',
      detail: errorMessage,
      life: 3000,
    });
  } finally {
    store.commit('LOADING', false);
  }
};
</script>
<template>
  <div class="table-toolbar">
    <ScanQR @scan="onScanQR" />
    <button class="ts-button ts-rfid-button ts-button-primary" type="button">
      <Icon icon="ri:qr-code-line" />
      {{ 'Scan QR' }}

      <i class="indicator bg-success"></i>
    </button>
    <SearchButton
      v-model="query"
      @search="
        () => {
          fetchParams.search = query;
        }
      "
    />
    <FilterButton @toggleFilter="showFilter = !showFilter" />
    <Button
      icon="ri-download-2-line"
      severity="success"
      outlined
      @click="exportExcel"
    />
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
<style lang="scss">
@import '~scss/index.scss';
.p-column-title {
  width: max-content !important;
}
</style>
