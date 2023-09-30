um
<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import {
  InputNumberBlurEvent,
  InputNumberInputEvent,
} from 'primevue/inputnumber';
import { useStore } from 'vuex';
import PrintQR from './PrintQR.vue';

const emit = defineEmits<{
  (e: 'closeDialog'): void;
  (e: 'nextStep', payload: any): void;
}>();

const qty = ref();

const updateQTY = (e: InputNumberInputEvent) => {
  qty.value = e.value;
  toggleDisableNext(e);
};

const isRetur = ref<boolean>(false);
const disableNext = ref<boolean>(true);

const nextStep = (): void => {
  emit('nextStep', { qty: qty.value, client: selectedClient.value });
};

const toggleDisableNext = (
  e: InputNumberBlurEvent | InputNumberInputEvent | boolean
): void => {
  // To disable and enable the next button if the form has not filled
  if (isRetur.value) {
    disableNext.value = !(
      qty.value != null && selectedClient.value != undefined
    );
  } else {
    selectedClient.value = undefined; // To reset the client input field if the checkbox is not checked
    disableNext.value = !(
      (typeof e !== 'boolean' && e.value != null) ||
      qty.value != null
    );
  }
};

interface Client {
  name: string;
}

const clientList = ref<Client[]>([
  {
    name: 'PT ABCD 1',
  },
  {
    name: 'PT ABCD 2',
  },
  {
    name: 'PT ABCD 3',
  },
]);

const selectedClient = ref<Client[]>();

const store = useStore();
const cancel = () => {
  store.commit('TOGGLE_SHOWADDQR', false);
};

const showConfirmDialog = ref<boolean>(false);
const showPrintQRDialog = ref<boolean>(false);
</script>
<template>
  <form id="add-qty" @submit.prevent="showConfirmDialog = true">
    <div style="display: flex; gap: 12px">
      <label :style="isRetur ? { maxWidth: '111px' } : ''">
        <span>Quantity<span class="required">*</span> </span>
        <InputNumber
          aria-required="true"
          v-model:model-value="qty"
          placeholder="input quantity"
          @input="updateQTY"
        />
      </label>
      <label v-if="isRetur" style="flex-grow: 1; width: 521px">
        <span>From Partner / Client<span class="required">*</span> </span>
        <Dropdown
          v-model="selectedClient"
          :options="clientList"
          filter
          optionLabel="name"
          placeholder="Select partner / client"
          @change="toggleDisableNext"
        />
      </label>
    </div>
    <div style="display: flex; gap: 8px">
      <Checkbox
        v-model="isRetur"
        :binary="true"
        @input="toggleDisableNext"
      /><span>Retur</span>
    </div>
    <div style="display: flex; gap: 8px; justify-content: flex-end">
      <Button
        label="Print QR"
        @click="showPrintQRDialog = true"
        severity="primary"
        :pt="{
          label: { style: 'line-height:12px' },
        }"
        :disabled="!qty"
      />
    </div>
    <div
      style="
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        padding-top: 20px;
      "
    >
      <Button label="Cancel" @click="cancel" class="cancel" />
      <Button
        severity="success"
        label="Next"
        :disabled="disableNext"
        type="submit"
        icon="pi pi-angle-right"
        iconPos="right"
      />
    </div>
  </form>
  <DynamicDialog
    v-model:visible="showConfirmDialog"
    header="Add Reader Stock"
    state="Add"
    severity="success"
    @confirm="nextStep"
  >
    <template #body>
      Are you sure want to add <b>{{ qty }}</b> Reader?
    </template>
  </DynamicDialog>
  <Dialog v-model:visible="showPrintQRDialog" modal header="Print Label QR">
    <PrintQR :qty="qty" />
    <template #footer>
      <Button
        severity="primary"
        label="Close"
        @click="showPrintQRDialog = false"
        class="primary-outlined"
      />
    </template>
  </Dialog>
</template>
<style lang="scss">
@import '~scss/index.scss';

form#add-qty {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 644px;

  label {
    color: $general-header-weak;
    font-size: 11.2px;
    font-style: normal;
    font-weight: 500;
    line-height: 16.8px; /* 150% */
    letter-spacing: 0.224px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex-grow: 1;

    .required {
      color: $danger;
    }

    span {
      width: 100%;
    }

    input {
      width: 100%;
    }
  }

  button.cancel {
    background: none;
    border: none;
    color: $general-header-weak;
  }
}

.p-button {
  padding: 7.6px 12px;
}

.p-button .p-button-label {
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.36px;
}

.p-button.p-button-success:disabled,
.p-button.p-button-primary:disabled {
  background: $general-grey;
  border-color: $general-grey;
  cursor: not-allowed;
}
</style>
