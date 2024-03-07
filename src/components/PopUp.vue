<template>
  <div v-if="_showPop" class="pop-container">
    <createEntityPop
      v-if="_type === 'createEntity'"
      :title="_title"
      :data="_data"
    ></createEntityPop>
    <genLinkPop v-if="_type === 'genLink'" :title="_title"></genLinkPop>
    <warPlanPop v-if="_type === 'warPlan'" :title="_title"></warPlanPop>
    <saveThoughtPop
      v-if="_type === 'saveThought'"
      :title="_title"
    ></saveThoughtPop>
    <replayChartPop
      v-if="_type === 'replayChart'"
      :title="_title"
    ></replayChartPop>
  </div>

  <Teleport to="body">
    <div v-if="_showMask" class="pop-mask"></div>
  </Teleport>
</template>

<script setup lang="ts">
import { usePopupStore } from '@/stores/popupStore'
import { storeToRefs } from 'pinia'
import createEntityPop from '@/components/PopUp/createEntityPop.vue'
import genLinkPop from '@/components/PopUp/genLinkPop.vue'
import warPlanPop from '@/components/PopUp/warPlanPop.vue'
import saveThoughtPop from './PopUp/saveThoughtPop.vue'
import replayChartPop from './PopUp/replayChartPop.vue'
const popupStore = usePopupStore()
const { _showMask, _showPop, _title, _type, _data } = storeToRefs(popupStore)
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
  /* transform: translate(-50%, -50%); */
}
.pop-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
</style>
