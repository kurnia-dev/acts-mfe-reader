import { TableColumn } from 'ts-admin-components-dev/dist/types/columns';
import Image from 'primevue/image';
import Field from '@/components/modules/AddReaderStock/Field.vue';
import { ref, Ref } from 'vue';
import { getImg } from '@/utils';
import { ButtonScanQR } from 'ts-mfe-console-vue-components';

const useColumns = (): Ref<TableColumn[]> => {
  return ref<TableColumn[]>([
    {
      field: 'image',
      header: 'Photo',
      sortable: true,
      fixed: true,
      bodyComponent() {
        return {
          component: Image,
          props: {
            src: getImg(''),
            preview: true,
            imageStyle:
              'height:36px;width:36px;object-fit:cover;border-radius:8px;',
            class: 'image img-preview',
          },
        };
      },
    },
    {
      field: 'name',
      header: 'Device Name',
      sortable: true,
      bodyTemplate: (data: any) => data.name,
    },
    {
      field: 'sku',
      header: 'SKU',
      sortable: true,
    },
    {
      field: 'category',
      header: 'Category',
      sortable: true,
      bodyComponent(data: any) {
        return {
          component: 'NameContainer',
          props: {
            name: data.category,
          },
        };
      },
    },
    {
      field: 'brand',
      header: 'Brand',
      sortable: true,
      bodyComponent(data: any) {
        return {
          component: 'NameContainer',
          props: {
            name: data.brand,
          },
        };
      },
    },
    {
      field: 'model',
      header: 'Model/Type',
      sortable: true,
      bodyComponent(data: any) {
        return {
          component: 'NameContainer',
          props: {
            name: data.model,
          },
        };
      },
    },
    {
      field: 'stock',
      header: 'Current Stock',
      sortable: true,
    },
    {
      field: 'lastTransaction',
      header: 'Last Transaction',
      sortable: true,
    },
    {
      field: 'transactionQty',
      header: 'Transaction Qty',
      sortable: true,
      bodyTemplate: (data: any) =>
        data.transactionQty ? data.transactionQty : 0,
    },
    {
      field: 'company',
      header: 'Partner/Client',
      sortable: true,
      bodyTemplate: (data: any) => (data.company ? data.company : '-'),
    },
    {
      field: 'manager',
      header: 'Manager',
      sortable: true,
      bodyTemplate: (data: any) => (data.manager ? data.manager : '-'),
    },
    {
      field: 'transactionDate',
      header: 'Transaction Date',
      sortable: true,
    },
  ]);
};

export const CurrentStockDetailColumns = ref<TableColumn[]>([
  {
    field: 'no',
    header: 'No',
    sortable: true,
    style: 'width:54.4px; text-align:center',
  },
  {
    field: 'name',
    header: 'Device Name',
    sortable: true,
  },
  {
    field: 'hardwareId',
    header: 'Hardware ID',
    sortable: true,
  },
  {
    field: 'deviceId',
    header: 'Device ID',
    sortable: true,
  },
  {
    field: 'readDistance',
    header: 'Read Distance',
    sortable: true,
  },
]);

export const TransactionDetailColumns = ref<TableColumn[]>([
  {
    field: 'no',
    header: 'No',
    sortable: true,
    style: 'width:54.4px; text-align:center',
  },
  {
    field: 'name',
    header: 'Device Name',
    sortable: true,
  },
  {
    field: 'hardwareId',
    header: 'Hardware ID',
    sortable: true,
  },
  {
    field: 'deviceId',
    header: 'Device ID',
    sortable: true,
  },
]);

export const StockDetailHistoryColumns = ref<TableColumn[]>([
  {
    field: 'lastTransaction',
    header: 'Transaction',
    sortable: true,
  },
  {
    field: 'transactionQty',
    header: 'Qty',
    sortable: true,
    style: 'width:86.2px;',
  },
  {
    field: 'company',
    header: 'Partner / Client',
    sortable: true,
  },
  {
    field: 'transactionDate',
    header: 'Date Time',
    sortable: true,
  },
  {
    field: 'manager',
    header: 'manager',
    sortable: true,
  },
]);

export const ScanQRStepTable = ref<TableColumn[]>([
  {
    field: 'qr_code',
    header: 'QR Code ',
    bodyComponent(data: any) {
      return {
        component: Field,
        props: {
          content: data.qr_code,
        },
      };
    },
  },
  {
    field: 'hardwareId',
    header: 'Hardware ID',
    bodyComponent(data: any) {
      return {
        component: Field,
        props: {
          content: data.hardwareId,
        },
      };
    },
  },
  {
    field: 'deviceId',
    header: 'Device ID',
    bodyComponent(data: any) {
      return {
        component: Field,
        props: {
          content: data.deviceId,
        },
      };
    },
  },
  {
    field: 'button_scan',
    header: '',
    bodyComponent(data: any) {
      return {
        component: ButtonScanQR,
        props: {
          label: data.label,
        },
      };
    },
  },
]);

export default useColumns;
