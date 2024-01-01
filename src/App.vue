<script setup lang="ts">
import Breadcrumb from '@/components/Breadcrumb.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const menus = computed(() => store.state.breadcrumb.menus);
const isLoading = computed(() => store.state.loading);
</script>
<template>
  <div class="tag-content-wrapper">
    <Breadcrumb :menus="menus" />
    <router-view />
    <Toast position="bottom-right" />
    <Loading v-model:active="isLoading" />
  </div>
</template>

<style>
@import '~primevue/resources/themes/lara-light-blue/theme.css';
@import '~remixicon/fonts/remixicon.css';
@import '~vue-loading-overlay/dist/css/index.css';
@import '~primevue/resources/primevue.min.css';
@import '~primeicons/primeicons.css';
@import '~node/ts-admin-components-dev/dist/style.css';
</style>

<style lang="scss">
@import '~scss/var';
@import '~rfs/scss';

* {
  font-family: 'Manrope', Helvetica, Arial, sans-serif;
}

.p-image-preview-indicator {
  border-radius: 10px;
  border: 1px solid #a0a3bd;
  .p-icon {
    width: 1rem;
    height: 1rem;
  }
}

.p-column-title {
  width: max-content !important;
  font-size: 11.2px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.224px;
}

.p-card {
  box-shadow: none;
}

.p-card .p-card-body {
  padding: 12px 24px;
}

.p-card .p-card-content {
  padding: 0;
}

.tag-content-wrapper {
  background: #f7f7fc;
  padding: 12px 24px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  .breadcrumb-label {
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 218.182% */
    letter-spacing: -0.22px;
  }
}

.table-toolbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;
  gap: 8px;
  padding: 0;
  border: none;
}

.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
  @include padding(11.2px 8px !important);
  border-width: 0 0 2px 0 !important;
  text-decoration: none;

  .p-menuitem-text {
    @include font-size(11.2px);
    font-weight: 500;
    color: $general-grey;
  }
}

.p-tabmenu-nav .p-tabmenuitem .p-menuitem-link:not(.p-disabled):focus {
  box-shadow: none;
}

.p-tabmenu .p-tabmenu-nav,
.p-tabmenuitem .p-menuitem-link {
  border-width: 0 0 2px 0 !important;
  color: $general-grey;
}

.p-tabmenuitem.p-highlight .p-menuitem-text {
  color: $primary;
}
</style>
