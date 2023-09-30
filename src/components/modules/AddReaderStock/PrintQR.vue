<script setup lang="ts">
defineProps<{
  qty: number;
}>();
</script>
<template>
  <div style="width: 280px">
    <span>Qty: {{ qty }} pcs</span>
    <div class="qr-container">
      <div v-for="i in qty" :key="i" class="qr"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
span {
  color: #6e7191;
  font-size: 11.2px;
  font-style: normal;
  font-weight: 300;
  line-height: 16px;
  letter-spacing: 0.224px;
  display: block;
  margin-bottom: 12px;
  padding: 5px 0;
}
.qr-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  gap: 12px 15px;
  width: max-content;
  margin: 0 auto;
}
.qr {
  width: 86.9px;
  height: 86.9px;
  flex-shrink: 0;
  border: 1px solid #000;
  background: #fff;
}
</style>
