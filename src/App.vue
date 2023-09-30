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
</style>

<style lang="scss">
@import '~scss/index.scss';

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

.p-datatable .p-datatable-thead > tr > th {
  border-bottom: 1px solid $general-line;
  background: $primary-bg-weak;
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
    color: $general-body;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 218.182% */
    letter-spacing: -0.22px;
  }
}

.table__toolbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;
  gap: 8px;
  background: $general-bg-white;
  padding: 0;
  border: none;
}

.table__toolbar button {
  height: 26.2px;
}

.p-datatable {
  margin: 0 !important;
}

.p-datatable .p-datatable-tbody > tr {
  outline: none;

  > td {
    border: none;
  }
}

.p-datepicker {
  scale: 0.65;
}

::-webkit-scrollbar {
  cursor: pointer;
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #a0a3bd64;
  border-radius: 4px;
}

.p-button.p-button-success.p-button-outlined {
  background-color: transparent !important;
}

button.p-button.p-component.p-button-primary.primary-outlined {
  border-radius: 4px;
  color: $primary;
  border: 1px solid;
  padding: 7.6px 12px;
  background: none;
}

button.p-button.p-component.p-button-text {
  border-radius: 4px;
  padding: 7.6px 12px;
  color: $general-header-weak;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.36px;
}

.p-button-icon.p-button-icon-left {
  margin-right: 4px;
}

.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
  margin: 0 0 -3px 0;
}

.p-datatable .p-paginator {
  padding-bottom: 0 !important;
}

.p-paginator .p-paginator-current {
  height: 26.2px;
}
</style>
