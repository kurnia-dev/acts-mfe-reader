<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import ProgressSpinner from 'primevue/progressspinner';

onBeforeUnmount(() => {
  stopScan();
});

const props = withDefaults(
  defineProps<{
    label?: string;
    id?: string;
    bulk?: boolean;
  }>(),
  {
    label: 'Scan QR',
    id: 'scan-qr-button',
  }
);

const emit = defineEmits<{
  scan: [value: string];
}>();

const toast = useToast();

const isScanning = ref(false);
const scanQrField = ref();

const focusToScanField = () => {
  scanQrField.value.focus();
};

const startScan = () => {
  isScanning.value = true;
  focusToScanField();
  toast.add({
    severity: 'info',
    group: 'scan-qr',
    closable: false,
  });

  window.addEventListener('click', focusToScanField);
};

const stopScan = () => {
  isScanning.value = false;
  window.removeEventListener('click', focusToScanField);
  toast.removeGroup('scan-qr');
};

const onScan = () => {
  emit('scan', scanQrField.value.value);
  scanQrField.value.value = '';

  if (!props.bulk) {
    stopScan();
  }
};
</script>

<template>
  <div class="">
    <!-- <Button :id="id" :disabled="isScanning" @click="startScan">
      <i class="ri-qr-code-line me-2"></i>
      <label class="me-2" style="">
        {{ label }}
      </label>
      <i
        class="ri-checkbox-blank-circle-fill"
        style="font-size: 6px"
        :style="{ color: isScanning ? '#53CE93' : '#FF0022' }"
      ></i>
    </Button> -->
    <button
      class="p-button p-component p-button-icon-left"
      type="button"
      @click="startScan"
      :disabled="isScanning"
    >
      <span class="p-button-icon ri-qr-code-line"></span>
      <span class="p-button-label">{{ label }}</span>
    </button>

    <input
      type="text"
      class="position-absolute"
      style="top: -10000px"
      ref="scanQrField"
      @change="onScan"
    />

    <Toast position="bottom-right" group="scan-qr">
      <template #message>
        <div class="d-flex align-items-center justify-content-between w-100">
          <div class="d-flex align-items-center">
            <ProgressSpinner class="me-2" style="width: 20px; height: 20px" />
            <label> Scanning QR Code </label>
          </div>
          <Button label="Stop scan" severity="danger" @click="stopScan" />
        </div>
      </template>
    </Toast>
  </div>
</template>
<style scoped>
.p-button {
  display: flex;
  align-items: center;
  gap: 4px;
}

.p-button .p-button-label {
  font-size: 8.86px;
}
</style>
