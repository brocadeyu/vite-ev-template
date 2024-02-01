<template>
  <div class="header-container">
    <div class="header-title">{{ title }}</div>
    <div class="header-spacer"></div>
    <div class="header-slot">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<style scoped>
.header-container {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  height: 8vh;
  background-image: url('../assets/header/header.png');
  background-repeat: no-repeat;
  background-position: 25% 100%;
  background-color: transparent;
}
.header-title {
  flex: 1;
  font-size: 24px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-spacer {
  flex: 5;
  margin-bottom: 2vh;
}
.header-slot {
  flex: 1;
  display: flex;
  margin-bottom: 2vh;
}
</style>
