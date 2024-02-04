<template>
  <div class="ms-container">
    <BaseDocker
      :title="'模型资源'"
      :height="'200px'"
      :width="'200px'"
    ></BaseDocker>
  </div>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
</script>

<style scoped>
.ms-container {
  position: fixed;
  top: 11vh;
  left: 20px;
}
</style>
