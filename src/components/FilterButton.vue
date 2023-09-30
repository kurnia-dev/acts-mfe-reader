<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const active = ref<boolean>(false);
defineEmits<(e: 'toggleFilter') => void>();
</script>
<template>
  <Button
    :icon="active ? 'ri-filter-line' : 'ri-filter-line'"
    severity="secondary"
    :outlined="!active"
    @click="$emit('toggleFilter'), (active = !active)"
  />
</template>
