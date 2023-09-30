<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits<(e: 'closeDialog') => void>();

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
const selectedRange = ref<Option>();

const setRange = () => {
  emit('closeDialog');
  console.log(selectedRange.value);
};
</script>
<template>
  <div style="width: 372px">
    <div class="reader-info">
      <div>Handheld Reader - 1</div>
      <div>Hardware ID: FESFSDF324</div>
      <div>Device ID: FESFSDF324</div>
    </div>
    <form @submit.prevent="setRange" id="form-select-range">
      <label for="select-range-input"
        >Select read distance you want to enable on this reader
      </label>
      <Dropdown
        id="select-range-input"
        :options="rangeSelection"
        v-model="selectedRange"
        optionLabel="name"
        placeholder="Select range"
      />
      <div class="form__button">
        <Button label="Cancel" text @click="$emit('closeDialog')" />
        <Button type="submit" severity="success" label="Save" />
      </div>
    </form>
  </div>
</template>
<style lang="scss">
@import '~scss/var';

.reader-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
  margin: 12px 0;

  color: $general-body;
  font-size: 11.2px;
  font-style: normal;
  font-weight: 500;
  line-height: 16.8px;
  letter-spacing: 0.224px;
}
#form-select-range {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .p-button.p-button-text {
    color: $general-header-weak;
  }
  label {
    color: $general-header-weak;
    font-size: 11.2px;
    font-style: normal;
    font-weight: 500;
    line-height: 16.8px; /* 150% */
    letter-spacing: 0.224px;
  }

  .form__button {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
}
</style>
