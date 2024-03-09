<template>
  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
  <CesiumMap></CesiumMap>
  <pop-up></pop-up>
</template>
<script setup lang="ts">
import PopUp from '@/components/PopUp.vue'
</script>
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
