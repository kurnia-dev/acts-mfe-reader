<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';
import store from '@/store';
import Field from './Field.vue';

interface Client {
  name: string;
}

const props = defineProps<{
  qty: number;
  isRetur?: boolean;
  client?: Client;
}>();

const count = ref<number>(0);

const scannedQR = ref<{
  qr_code: string;
  hardware_id: string;
  device_id: string;
}>();

const ScanQRStepData = computed(() => [
  {
    qr_code: scannedQR.value?.qr_code,
    hardware_id: scannedQR.value?.hardware_id,
    device_id: scannedQR.value?.device_id,
    label: ReaderButtonLabel.value,
  },
]);

const scannedQRList = ref([
  {
    'no': ++count.value,
    'qr-code': 'F*28EBB',
    'hardware-id': 'FESFSDF324',
    'device-id': 'FESFSDF324',
    'added-time': '22/03/23 13:00',
    'status': 'Submitted',
  },
]);

const scannedQRCount = computed(() => scannedQRList.value.length);

const ReaderButtonLabel = computed(() => {
  if (scannedQR.value?.qr_code) {
    if (scannedQR.value?.hardware_id) {
      return 'Scan Device ID';
    } else {
      return 'Scan Hardware ID';
    }
  } else {
    return 'Scan QR';
  }
});

const isFinish = computed(() => scannedQRCount.value === props.qty);

const showCloseAlert = ref<boolean>(false);

const finishScanQR = () => {
  showCloseAlert.value = false;
  store.commit('TOGGLE_SHOWADDQR', false);
};

import { useToast } from 'primevue/usetoast';
const toast = useToast();

const rfidAdded = () => {
  toast.add({
    severity: 'success',
    detail: 'Success, RFID TAG stock has been submitted',
    life: 3000,
  });
};

const rfidFailedToAdd = () => {
  toast.add({
    severity: 'error',
    detail: 'Error, failed to submit RFID TAG Stock',
    life: 3000,
  });
};

import { putQRStock } from '@/services/reader.service';
const submitQR = async () => {
  try {
    await putQRStock(props);
    rfidAdded();
  } catch {
    rfidFailedToAdd();
  } finally {
    //
  }
};
</script>
<template>
  <div id="scan-rfid">
    <Toolbar class="table-toolbar">
      <template #start>
        <span class="message">Make sure the reader is connected</span>
      </template>
      <template #end>
        <div>
          Scanned:
          <span :class="{ 'text-success': isFinish }"
            >{{ scannedQRCount }}/{{ qty }}</span
          >
        </div>
      </template>
    </Toolbar>
    <span class="message scanner-message text-danger">
      Please connect the reader via USB first!
    </span>
    <DataTable :value="ScanQRStepData">
      <Column field="qr-code" header="QR Code">
        <template #body="slotProps">
          <Field :content="slotProps.data.qr_code" /></template
      ></Column>
      <Column field="hardwareId" header="Hardware ID">
        <template #body="slotProps">
          <Field :content="slotProps.data.hardwareId" />
        </template>
      </Column>
      <Column field="deviceId" header="Device ID">
        <template #body="slotProps">
          <Field :content="slotProps.data.deviceId" />
        </template>
      </Column>
      <Column field="buttonScan" header="">
        <template #body="slotProps">
          <ButtonScanQR :label="slotProps.data.label" @scan="submitQR" />
        </template>
      </Column>
    </DataTable>
    <DataTable :value="scannedQRList">
      <Column field="no" header="No" sortable />
      <Column field="qr-code" header="QR Code" sortable />
      <Column field="hardware-id" header="Hardware ID (HID)" sortable />
      <Column field="device-id" header="Device ID" sortable />
      <Column field="added-time" header="Added Time" sortable />
      <Column field="Status" header="Status" sortable>
        <template #body="slotProps">
          <NameContainer :name="slotProps.data.status" severity="success" />
        </template>
      </Column>
    </DataTable>
    <div style="display: flex; gap: 8px; justify-content: flex-end">
      <Button
        v-if="isFinish"
        severity="primary"
        label="Finish"
        @click="finishScanQR"
      />
      <Button v-else label="Close" @click="showCloseAlert = true" text />
    </div>
    <DynamicDialog
      v-model:visible="showCloseAlert"
      icon="ri-error-warning-line"
      severity="danger"
      header="Close This Window"
      state="Close"
      @confirm="finishScanQR"
    >
      <template #body>
        Your registered reader is <b>{{ scannedQRCount }}/{{ qty }}</b
        >. All registered reader will be saved. Are you sure want to close this
        window ?
      </template>
    </DynamicDialog>
  </div>
</template>
<style lang="scss">
@import '~scss/index.scss';

#scan-rfid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

#scan-rfid .p-datatable-table {
  width: 644px;
}

.p-datatable .p-datatable-thead > tr > th {
  padding: 9.6px;
}

button.cancel {
  background: none;
  border: none;
  color: $general-header-weak;
}

span.message {
  color: $general-header-weak;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.24px;
}
</style>
