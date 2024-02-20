<template>
  <div v-if="_showPop" class="pop-container">
    <createEntityPop
      v-if="_type === 'createEntity'"
      :title="_title"
    ></createEntityPop>
  </div>

  <Teleport to="body">
    <div v-if="_showMask" class="pop-mask"></div>
  </Teleport>
</template>

<script setup lang="ts">
import { usePopupStore } from '@/stores/popupStore'
import { storeToRefs } from 'pinia'
import createEntityPop from '@/popup/createEntityPop.vue'
const popupStore = usePopupStore()
const { _showMask, _showPop, _title, _type } = storeToRefs(popupStore)
</script>

<style scoped>
.pop-container {
  position: fixed;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.pop-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
