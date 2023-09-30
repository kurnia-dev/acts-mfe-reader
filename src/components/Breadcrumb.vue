<script lang="ts" setup>
import { computed } from 'vue';
import { Menus } from '@/types/breadcrumb';

const props = defineProps<{
  menus: Menus[];
}>();

const lastIndex = computed(() => props.menus.length - 1);
</script>

<template>
  <div class="d-flex align-items-center breadcrumb">
    <div
      v-for="(menu, index) in props.menus"
      :key="index"
      class="d-flex align-items-center"
    >
      <div v-if="index !== lastIndex" class="d-flex align-items-center">
        <router-link
          :to="menu.route!"
          class="text-decoration-none breadcrumb-label"
          >www
          {{ menu.name }}
        </router-link>
        <div class="breadcrumb-separator d-flex align-items-center">></div>
      </div>
      <div v-else class="breadcrumb-label">
        {{ menu.name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~rfs/scss';

.breadcrumb {
  margin-bottom: 8px;
}

.breadcrumb-label {
  @include font-size(12px);
  font-weight: 500;
}

.breadcrumb-separator {
  @include font-size(14px);
  font-weight: 500;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
