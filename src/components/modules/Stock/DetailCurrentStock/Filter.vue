<script setup lang="ts">
import { computed, ref } from 'vue';

const emit = defineEmits<{
  (e: 'clearFilter'): void;
  (e: 'applyFilter', filter: any): void;
}>();

interface Option {
  name: string;
}

const rangeSelection: Option[] = [
  {
    name: 'Short range',
  },
  {
    name: 'Long range',
  },
  {
    name: 'Short & Long range',
  },
];

const selectedRange = ref<Option[]>();
const rangeParam = computed(() =>
  selectedRange.value?.map((item) => item.name)
);

const applyFilter = () => {
  emit('applyFilter', {
    readDistance: JSON.stringify(rangeParam.value),
  });
  console.log(JSON.stringify(rangeParam.value));
};
</script>
<template>
  <div
    class="bg-light p-3"
    style="display: flex; flex-direction: column; gap: 12px"
  >
    <div style="width: 176px">
      <label style="margin-bottom: 4px">Read Distance Setting</label>
      <MultiSelect
        display="chip"
        v-model="selectedRange"
        placeholder="Select Range"
        :options="rangeSelection"
        optionLabel="name"
        filter
      />
    </div>
    <div class="col-12 form-group d-flex gap-2 justify-content-end">
      <Button text label="Clear Field" @click="selectedRange = undefined" />
      <Button label="Apply" severity="success" @click="applyFilter" />
    </div>
  </div>
</template>
