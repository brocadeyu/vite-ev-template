<template>
  <div class="em-container">
    <BaseDocker
      :title="'想定管理'"
      :height="'250px'"
      :width="'200px'"
    ></BaseDocker>
  </div>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
</script>

<style scoped>
.em-container {
  position: fixed;
  top: 45vh;
  left: 20px;
}
</style>
