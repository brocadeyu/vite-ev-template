<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <CesiumMap></CesiumMap>
    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
    <pop-up></pop-up>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>
