<script setup lang="ts">
import { ref, reactive, defineEmits } from 'vue';
import { Filter, FilterParams } from '@/types/filter.type';

const emit = defineEmits<{
  (e: 'clearFilter'): void;
  (e: 'applyFilter', params: any): void;
}>();

interface Option {
  name: string;
}

const lastTransactionOptions = ref<Option[]>([
  { name: 'In' },
  { name: 'Out' },
  { name: 'Retur' },
]);

const clientList = ref<Option[]>();
const fetchClientList = (): void => console.log();

const managerList = ref<Option[]>();
const fetchManagerList = (): void => console.log();

const filter = reactive<Filter>({});
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
  <div class="bg-light mt-2 p-3">
    <div class="row justify-content-left">
      <div class="col-3 form-group" style="width: 50%">
        <label>Transaction</label>
        <MultiSelect
          display="chip"
          v-model="filter.lastTransaction"
          placeholder="Select transaction"
          :options="lastTransactionOptions"
          optionLabel="name"
        />
      </div>
      <div class="col-3 form-group" style="width: 50%">
        <label>Quantity</label>
        <InputNumber
          v-model="filter.transactionQty"
          placeholder="Fill in with number"
          class="w-100"
        />
      </div>
      <div class="col-3 form-group" style="width: 50%">
        <label>Partner/Client</label>
        <MultiSelect
          display="chip"
          v-model="filter.company"
          placeholder="Select partner/client"
          filter
          :options="clientList"
          optionLabel="name"
          @show="fetchClientList"
        />
      </div>
      <div class="col-3 form-group" style="width: 50%">
        <label>Date</label>
        <Calendar
          v-model="filter.transactionDate"
          selectionMode="range"
          placeholder="dd/mm/yyyy - dd/mm/yyyy"
          class="w-100"
          showIcon
        />
      </div>
      <div class="col-3 form-group" style="width: 50%">
        <label>Manager</label>
        <MultiSelect
          display="chip"
          v-model="filter.manager"
          placeholder="Select manager"
          filter
          :options="managerList"
          optionLabel="name"
          @show="fetchManagerList"
        />
      </div>
      <div class="col-12 form-group d-flex gap-2 justify-content-end">
        <Button text label="Clear Field" @click="clearFilter" />
        <Button label="Apply" severity="success" @click="applyFilter" />
      </div>
    </div>
  </div>
</template>
