<script setup lang="ts">
defineProps<{
  content: string;
}>();
</script>
<template>
  <span>{{ content }}</span>
</template>
<style scoped>
span {
  display: flex;
  height: 24px;
  padding: 8px 12px;
  align-items: center;
  gap: 5px;
  flex: 1 0 0;

  border-radius: 4px;
  border: 1px solid var(--general-body, #4e4b66);
  background: var(--general-input, #eff0f6);
}
</style>
