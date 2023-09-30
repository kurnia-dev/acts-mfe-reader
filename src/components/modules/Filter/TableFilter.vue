<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits, computed } from 'vue';
import { Filter, FilterParams } from '@/types/filter.type';

defineProps<{
  filterList: string[];
  columnCount: number | string;
}>();

const emit = defineEmits<{
  (e: 'applyFilter', payload: any): void;
  (e: 'clearFilter'): void;
}>();

const allData = ref();
const fetchData = (params?: FetchParams) => {
  fetchAPI('/v2/_id', params).then((res) => {
    allData.value = res?.data;
  });
};

fetchData();
const filter = reactive<Filter>({});

/**
 * Note:
 * Because the Fake API does not support nested object or array,
 * the deviceNameOption, brandOption and other options for multiselect
 * now is using string array
 *
 * If use the real API, set the optionKey in every multiselects.
 */

const deviceNameOption = computed(() =>
  allData.value?.reduce((option: string[], item: any) => {
    if (!option.includes(item.name)) {
      option.push(item.name);
    }

    return option;
  }, [])
);

const brandOptions = computed(() =>
  allData.value?.reduce((option: string[], item: any) => {
    if (!option.includes(item.brand)) {
      option.push(item.brand);
    }

    return option;
  }, [])
);

const modelOptions = computed(() =>
  allData.value?.reduce((option: string[], item: any) => {
    if (!option.includes(item.brand)) {
      option.push(item.brand);
    }

    return option;
  }, [])
);

import { LastTransaction } from '@/types/lastTransaction.type';
import { fetchAPI } from '@/services/reader.service';
import FetchParams from '@/types/fetchParams.type';
const lastTransactionOptions = ref<LastTransaction[]>(['In', 'Out', 'Retur']);

const companyList = computed(() =>
  allData.value?.reduce((option: string[], item: any) => {
    if (!option.includes(item.company)) {
      option.push(item.company);
    }

    return option;
  }, [])
);

const managerList = computed(() =>
  allData.value?.reduce((option: string[], item: any) => {
    if (!option.includes(item.manager)) {
      option.push(item.manager);
    }

    return option;
  }, [])
);

/**
 * A reactive object holding the filter parameters for filtering table data.
 */
const filterParams = ref<FilterParams>({});

const applyFilter = () => {
  Object.keys(filter).forEach((key) => {
    if (key === 'stock' || key === 'transactionQty') {
      filterParams.value[key] = filter[key];
    } else if (key === 'transactionDate') {
      filterParams.value[key] = JSON.stringify(
        filter[key]?.map((dateString: string) => new Date(dateString).getTime())
      );
    } else {
      filterParams.value = Object.assign(filterParams.value, {
        [key]: JSON.stringify(filter[key as keyof FilterParams]),
      });
    }
  });

  emit('applyFilter', filterParams.value);
};

const clearFilter = () => {
  for (const key of Object.keys(filter) as (keyof typeof filter)[]) {
    delete filter[key];
  }

  filterParams.value = {};

  emit('clearFilter');
};
</script>
<template>
  <div class="bg-light mt-2 p-2">
    <div class="row justify-content-left">
      <div
        class="col-3 form-group"
        :style="Number(columnCount) <= 2 ? { width: '50%' } : { width: '25%' }"
        v-if="filterList.includes('name')"
      >
        <label>Device Name</label>
        <MultiSelect
          display="chip"
          v-model="filter.name"
          placeholder="Select Device Name"
          :options="deviceNameOption"
          filter
        />
      </div>
      <div
        class="col-3 form-group"
        :style="Number(columnCount) <= 2 ? { width: '50%' } : { width: '25%' }"
        v-if="filterList.includes('brand')"
      >
        <label>Brand</label>
        <MultiSelect
          display="chip"
          v-model="filter.brand"
          placeholder="Select brand"
          :options="brandOptions"
          filter
        />
      </div>
      <div
        class="col-3 form-group"
        :style="Number(columnCount) <= 2 ? { width: '50%' } : { width: '25%' }"
        v-if="filterList.includes('model')"
      >
        <label>Model/Type</label>
        <MultiSelect
          display="chip"
          v-model="filter.model"
          placeholder="Select model/type"
          :options="modelOptions"
          filter
        />
      </div>
      <div
        class="col-3 form-group"
        :style="Number(columnCount) <= 2 ? { width: '50%' } : { width: '25%' }"
        v-if="filterList.includes('stock')"
      >
        <label>Current Stock</label>
        <InputNumber
          v-model="filter.stock"
          placeholder="Fill in with number"
          class="w-100"
        />
      </div>
      <div
        class="col-3 form-group"
        :style="Number(columnCount) <= 2 ? { width: '50%' } : { width: '25%' }"
        v-if="filterList.includes('lastTransaction')"
      >
        <label>Last Transaction</label>
        <MultiSelect
          display="chip"
          v-model="filter.lastTransaction"
          placeholder="Select model/type"
          :options="lastTransactionOptions"
        />
      </div>
      <div
        class="col-3 form-group"
        :style="Number(columnCount) <= 2 ? { width: '50%' } : { width: '25%' }"
        v-if="filterList.includes('transactionQty')"
      >
        <label>Transaction Qty</label>
        <InputNumber
          v-model="filter.transactionQty"
          placeholder="Fill in with number"
          class="w-100"
        />
      </div>
      <div
        class="col-3 form-group"
        :style="Number(columnCount) <= 2 ? { width: '50%' } : { width: '25%' }"
        v-if="filterList.includes('company')"
      >
        <label>Partner/Client</label>
        <MultiSelect
          display="chip"
          v-model="filter.company"
          placeholder="Select partner/client"
          filter
          :options="companyList"
        />
      </div>
      <div
        class="col-3 form-group"
        :style="Number(columnCount) <= 2 ? { width: '50%' } : { width: '25%' }"
        v-if="filterList.includes('manager')"
      >
        <label>Manager</label>
        <MultiSelect
          display="chip"
          v-model="filter.manager"
          placeholder="Select partner/client"
          filter
          :options="managerList"
        />
      </div>
      <div
        class="col-3 form-group"
        :style="Number(columnCount) <= 2 ? { width: '50%' } : { width: '25%' }"
        v-if="filterList.includes('transactionDate')"
      >
        <label>Transaction Date</label>
        <Calendar
          v-model="filter.transactionDate"
          selectionMode="range"
          placeholder="dd/mm/yyyy - dd/mm/yyyy"
          class="w-100"
          showIcon
        />
      </div>
      <div class="col-12 form-group d-flex gap-2 justify-content-end">
        <Button text label="Clear Field" @click="clearFilter" />
        <Button label="Apply" severity="success" @click="applyFilter" />
      </div>
    </div>
  </div>
</template>
