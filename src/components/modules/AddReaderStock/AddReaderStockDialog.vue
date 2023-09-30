<script setup lang="ts">
import { fetchAPI } from '@/services/reader.service';
import FormStep from './FormStep.vue';
import DetailCard from '@/components/common/DetailCard.vue';
import { ref, computed } from 'vue';
import FetchParams from '@/types/fetchParams.type';

const props = defineProps<{
  id: string;
}>();

const currentItem = ref();
const fetchDetail = (params?: FetchParams) => {
  fetchAPI('/v2/_id/' + props.id, params).then((data) => {
    currentItem.value = data;
  });
};

fetchDetail();
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
  <div
    style="
      width: max-content;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 12px;
    "
  >
    <!-- <div class="wrapper">
      <img :src="image" alt="" />
      <div class="details">
        <div>
          <div class="device_name">Handheld Reader</div>
          <div class="model_name">TS-HNDSR-001</div>
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            gap: 2px;
          "
        >
          <div
            class="column"
            v-for="(value, key) in details"
            :key="key + value"
          >
            <div class="key">{{ key }}</div>
            <div class="separator">:</div>
            <div class="value">
              <NameContainer :name="value" />
            </div>
          </div>
        </div>
        <div class="stock_info">Current Stock: {{ currentStocks }} Unit(s)</div>
      </div>
    </div> -->
    <DetailCard :item="propItem" />
    <FormStep />
  </div>
</template>
<style scoped lang="scss">
@import '~scss/index';

img {
  width: 125px;
  height: 125px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 8px;
}

.wrapper {
  display: flex;
  gap: 18px;
}
.details {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 6px;
  .device_name {
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 171.429% */
    letter-spacing: -0.28px;
  }

  .model_name,
  .stock_info {
    color: $general-label;
    font-size: 11.2px;
    font-style: normal;
    font-weight: 500;
    line-height: 16.8px; /* 150% */
    letter-spacing: 0.224px;
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
</style>
