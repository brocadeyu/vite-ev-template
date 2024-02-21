<template>
  <div class="ms-container">
    <BaseDocker :title="'模型资源'" :height="'200px'" :width="'200px'">
      <template #content>
        <div class="card-container">
          <div
            v-for="(item, index) in modelConfig"
            :key="index"
            class="card-item"
            @click="tryAddEntity(item, index)"
          >
            <img
              class="card-img"
              :class="{ 'card-active': activeIndex === index }"
              :src="item.img"
              width="60px"
              height="60px"
            />
            {{ item.type }}
          </div>
        </div>
      </template>
    </BaseDocker>
  </div>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
import { ref } from 'vue'
import WZImg from '@/assets/model/wzzsj.png'
import ZCImg from '@/assets/model/zczsj.png'
import SHIP052C from '@/assets/model/052c.png'
import SHIP052D from '@/assets/model/052d.png'

import { useCesiumStore } from '@/stores/cesiumStore'
import { usePopupStore } from '@/stores/popupStore'
const modelConfig = ref([
  {
    type: '武装直升机',
    img: WZImg
  },
  {
    type: '侦察直升机',
    img: ZCImg
  },
  {
    type: '中国052C型驱逐舰',
    img: SHIP052C
  },
  {
    type: '中国052D型驱逐舰',
    img: SHIP052D
  }
])
const activeIndex = ref<number>(-1)
const cesiumStore = useCesiumStore()
const popupStore = usePopupStore()
const tryAddEntity = (modelInfo, index: number) => {
  if (activeIndex.value !== -1) return
  activeIndex.value = index
  cesiumStore.cesium.eventHandler.register({
    type: 'LeftClick',
    id: 'createEntity',
    callBack: (e) => {
      console.log('点击地图', e)
      popupStore.openPop({
        title: '添加实体',
        type: 'createEntity',
        data: { position: e.position, modelInfo }
      })
      cesiumStore.cesium.eventHandler.remove({
        type: 'LeftClick',
        id: 'createEntity'
      })
      activeIndex.value = -1
    }
  })
}
</script>

<style scoped>
.ms-container {
  position: fixed;
  top: 11vh;
  left: 20px;
}
.card-container {
  display: flex;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 0;
}
.card-item {
  width: 65px;
  height: 65px;
  font-size: 12px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.card-img {
  border: 2px solid #145780;
}
.card-active {
  border-color: rgb(0, 128, 255);
}
</style>
