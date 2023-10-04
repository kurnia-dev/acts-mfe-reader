<script setup lang="ts">
import { getImg } from '@/utils';
import { computed } from 'vue';

interface Detail {
  label: string;
  value: string | number;
  nameContainer?: boolean;
}

const props = defineProps<{
  item: {
    image_name: string;
    device_name: string;
    sku: string;
    details: Detail[];
  };
}>();

const image = computed(() => getImg(props.item.image_name));
</script>
<template>
  <div class="details_container">
    <div class="details_wrapper">
      <img :src="image" alt="" />
      <div class="details">
        <div>
          <div class="details__device_name">{{ item.device_name }}</div>
          <div class="details__model_name">{{ item.sku }}</div>
        </div>
        <table>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr
            v-for="{ label, value, nameContainer } in item.details"
            :key="label + value"
          >
            <td style="width: 80px">{{ label }}</td>
            <td style="width: 12px">:</td>
            <td v-if="nameContainer"><NameContainer :name="value" /></td>
            <td v-else class="details__stock_info">{{ value }} Unit(s)</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import '~scss/index.scss';
img {
  width: 125px;
  height: 125px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 8px;
}

.details_container {
  min-width: 544px;
  max-width: 544px;
  .details_wrapper {
    display: flex;
    gap: 18px;
    margin-bottom: 12px;
    align-items: center;
  }
  .details {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 6px;
    .details__device_name {
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px; /* 171.429% */
      letter-spacing: -0.28px;
    }

    .details__model_name,
    .details__stock_info {
      color: $general-label;
      font-size: 11.2px;
      font-style: normal;
      font-weight: 500;
      line-height: 16.8px; /* 150% */
      letter-spacing: 0.224px;
    }
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
