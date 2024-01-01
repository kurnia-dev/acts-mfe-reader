/* eslint-disable vue/multi-word-component-names */
import { h, createApp } from 'vue';
import singleSpaVue from 'single-spa-vue';

import App from './App.vue';
import router from './router';
import store from './store';
import PrimeVue from 'primevue/config';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';

import 'ts-admin-components-dev/dist/style.css';
import 'remixicon/fonts/remixicon.css';
import 'vue-loading-overlay/dist/css/index.css';

import {
  DynamicTable,
  NameContainer,
  DynamicDialog,
  GroupNameContainer,
  SearchButton,
  SelectGroup,
  CToastService,
  GroupTree,
  CategoryTree,
  DateText,
  StaticTable,
  ScanQR,
} from 'ts-admin-components-dev';

import { Icon } from '@iconify/vue';

import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Card from 'primevue/card';
import Menu from 'primevue/menu';

import TabMenu from 'primevue/tabmenu';
import MultiSelect from 'primevue/multiselect';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import Steps from 'primevue/steps';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import Toolbar from 'primevue/toolbar';
import Loading from 'vue-loading-overlay';

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        // single-spa props are available on the "this" object. Forward them to your component as needed.
        // https://single-spa.js.org/docs/building-applications#lifecycle-props
        // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
        /*
        name: this.name,
        mountParcel: this.mountParcel,
        singleSpa: this.singleSpa,
        */
      });
    },
  },
  handleInstance(app) {
    app.use(router);
    app.use(store);
    app.use(PrimeVue);
    app.use(ToastService);
    app.use(DialogService);
    app.use(CToastService);

    app.component('Button', Button);
    app.component('Column', Column);
    app.component('Card', Card);
    app.component('DataTable', DataTable);
    app.component('TabView', TabView);
    app.component('TabPanel', TabPanel);
    app.component('Toast', Toast);
    app.component('TabMenu', TabMenu);
    app.component('MultiSelect', MultiSelect);
    app.component('InputNumber', InputNumber);
    app.component('Calendar', Calendar);
    app.component('Menu', Menu);
    app.component('Dialog', Dialog);
    app.component('Checkbox', Checkbox);
    app.component('Dropdown', Dropdown);
    app.component('Toolbar', Toolbar);
    app.component('Loading', Loading);
    app.component('ScanQR', ScanQR);

    app.component('DynamicTable', DynamicTable);
    app.component('StaticTable', StaticTable);
    app.component('NameContainer', NameContainer);
    app.component('DynamicDialog', DynamicDialog);
    app.component('GroupNameContainer', GroupNameContainer);
    app.component('SearchButton', SearchButton);
    app.component('SelectGroup', SelectGroup);
    app.component('CToastService', CToastService);
    app.component('GroupTree', GroupTree);
    app.component('CategoryTree', CategoryTree);
    app.component('DateText', DateText);
    app.component('Steps', Steps);
    app.component('Icon', Icon);
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
