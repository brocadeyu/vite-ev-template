<template>
  <div class="dp-container">
    <BaseDocker
      :title="'数据日志'"
      :height="'230px'"
      :width="'200px'"
      icon="view"
    >
      <template #content>
        <div class="dp-content"></div>
      </template>
    </BaseDocker>
  </div>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
</script>

<style scoped>
.dp-container {
  position: fixed;
  top: 45vh;
  left: 20px;
}
.dp-content {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 2px;
  padding-right: 2px;
  padding-left: 2px;
  box-sizing: border-box;
}
</style>
