<script setup lang="ts">
import { computed, ref } from 'vue';
import { DropdownOption, SelectGroup } from 'ts-admin-components-dev';
import { TDropdownOption } from 'ts-admin-components-dev/dist/types/dropdownOption';

const emit = defineEmits<{
  (e: 'clearFilter'): void;
  (e: 'applyFilter', filter: any): void;
}>();

const rangeSelection: TDropdownOption[] = [
  {
    label: 'Short range',
    value: 'Short range',
  },
  {
    label: 'Long range',
    value: 'Long range',
  },
  {
    label: 'Short & Long range',
    value: 'Short & Long range',
  },
];

const selectedRange = ref<any[]>([]);
const rangeParam = computed(() =>
  selectedRange.value?.map((item) => item.value)
);

const applyFilter = () => {
  emit('applyFilter', {
    readDistance: JSON.stringify(rangeParam.value),
  });
};

const group = ref<number[]>([]);
</script>
<template>
  <div
    class="bg-light p-3"
    style="display: flex; flex-direction: column; gap: 12px"
  >
    <div style="width: 176px">
      <DropdownOption
        v-model="selectedRange"
        mode="multi"
        :options="rangeSelection"
        label="Read Distance Setting"
        placeholder="Select Range"
      />
    </div>
    <div style="width: 176px">
      <SelectGroup
        selection-mode="single"
        v-model="group"
        :params="{ all: true }"
      />
    </div>
    <div class="col-12 form-group d-flex gap-2 justify-content-end">
      <Button text label="Clear Field" @click="selectedRange = []" />
      <Button label="Apply" severity="success" @click="applyFilter" />
    </div>
  </div>
</template>
