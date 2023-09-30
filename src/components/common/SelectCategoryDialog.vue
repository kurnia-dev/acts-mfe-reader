<script lang="ts" setup>
import { CategoryTree } from 'ts-mfe-console-vue-components';
import { computed, ref, defineEmits, defineProps } from 'vue';

const props = defineProps<{
  show: boolean;
  category?: object;
  selectionMode: 'checkbox' | 'single';
  buttonHidden?: boolean;
}>();

const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'apply', data: any): void;
  (e: 'keyChange', data: any): void;
}>();

const categoryTemp = ref<any>(props.category);

const show = computed(() => props.show);
</script>

<template>
  <Dialog
    v-model:visible="show"
    modal
    style="width: 271px"
    :draggable="false"
    header="Select Category"
    @show="() => (categoryTemp = props.category ? props.category : {})"
    @hide="() => (categoryTemp = {})"
    :closable="false"
  >
    <CategoryTree
      :selection-mode="props.selectionMode"
      v-model:selected-keys="categoryTemp"
      @key-change="emit('keyChange', $event)"
    />
    <template #footer>
      <div class="d-flex justify-content-end gap-2">
        <Button
          label="Cancel"
          text
          severity="secondary"
          @click="emit('cancel')"
        />
        <Button
          v-if="!props.buttonHidden"
          label="Apply"
          severity="success"
          @click="emit('apply', categoryTemp)"
        />
      </div>
    </template>
  </Dialog>
</template>
