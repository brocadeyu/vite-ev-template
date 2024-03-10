<template>
  <router-view> </router-view>
</template>
<script setup lang="ts"></script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>
