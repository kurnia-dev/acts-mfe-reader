<script setup lang="ts">
import { ref } from 'vue';
import FormAddQty from './FormAddQty.vue';
import FormScanQR from './FormScanQR.vue';

const steps = ref([
  {
    number: 1,
    label: 'Input Quantity',
  },
  {
    number: 2,
    label: 'Scan',
  },
]);

const currentStep = ref<number>(1);
const stepProp = ref(); // store value from the first Step
</script>
<template>
  <nav class="p-steps p-component">
    <ol class="p-steps-list">
      <li
        class="p-steps-item"
        v-for="step in steps"
        :key="step.label"
        :class="{ 'p-highlight p-steps-current': step.number === currentStep }"
      >
        <a class="p-menuitem-link"
          ><span class="p-steps-number">{{ step.number }}</span
          ><span class="p-steps-title">{{ step.label }}</span></a
        >
      </li>
    </ol>
  </nav>
  <FormAddQty
    v-if="currentStep === 1"
    @nextStep="
      (payload) => {
        currentStep++;
        stepProp = payload;
      }
    "
  />
  <FormScanQR v-else :qty="stepProp.qty" :client="stepProp.client" />
</template>
<style lang="scss">
@import '~scss/index.scss';

.p-steps .p-steps-list {
  display: flex;
  list-style: none;
  width: max-content;
  flex: 0 0 auto;
  gap: 12px;
  margin: 0;
  padding: 0;
}

.p-steps .p-steps-item::before {
  display: none;
}

.p-steps .p-steps-item .p-menuitem-link {
  flex-direction: row;
  gap: 4px;
  color: $general-grey;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.36px;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.p-steps .p-steps-item.p-highlight .p-menuitem-link,
.p-steps .p-steps-item.p-highlight .p-steps-title {
  color: $primary;
}

.p-steps .p-steps-item.p-highlight .p-steps-number {
  border: 2px solid;
}

.p-steps .p-steps-item .p-menuitem-link .p-steps-title {
  margin-top: 0;
}

.p-steps .p-steps-item .p-menuitem-link .p-steps-number {
  font-size: inherit;
  color: inherit;
  border: 1.5px solid;
  min-width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
