<template>
  <div class="ms-container">
    <BaseDocker
      :title="'模型资源'"
      :height="'220px'"
      :width="'200px'"
      icon="pointer"
    >
      <template #content>
        <div class="card-container">
          <div
            v-for="(item, index) in modelConfig"
            :key="index"
            class="card-item"
            :class="{ 'card-active': activeIndex === index }"
            @click="tryAddEntity(item, index)"
          >
            <img class="card-img" :src="item.img" width="60px" height="60px" />
            {{ item.fakeType }}
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
// import ZCImg from '@/assets/model/zczsj.png'
import SHIP052C from '@/assets/model/052c.png'
import SHIP052D from '@/assets/model/052d.png'
import H6k from '@/assets/model/h6k.jpg'

import { useCesiumStore } from '@/stores/cesiumStore'
import { usePopupStore } from '@/stores/popupStore'
import { useToolTipStore } from '@/stores/tooltipStore'
const modelConfig = ref([
  {
    type: '武装直升机',
    img: H6k,
    fakeType: 'h-6k轰炸机'
  },
  {
    type: '侦察直升机',
    fakeType: '预警直升机',
    img: WZImg
  },
  {
    type: '中国052C型驱逐舰',
    fakeType: '中国052C型驱逐舰',
    img: SHIP052C
  },
  {
    type: '中国052D型驱逐舰',
    fakeType: '中国052D型驱逐舰',
    img: SHIP052D
  }
])
// const modelConfig = ref([
//   {
//     type: 'h-6k轰炸机',
//     img: H6k
//   },
//   {
//     type: '预警直升机',
//     img: WZImg
//   },
//   {
//     type: '中国052C型驱逐舰',
//     img: SHIP052C
//   },
//   {
//     type: '中国052D型驱逐舰',
//     img: SHIP052D
//   }
// ])
const activeIndex = ref<number>(-1)
const cesiumStore = useCesiumStore()
const popupStore = usePopupStore()
const tooltipStore = useToolTipStore()
const tryAddEntity = (modelInfo, index: number) => {
  if (activeIndex.value !== -1) return
  activeIndex.value = index
  tooltipStore.showTooltip({ text: '单击地球，选取点位' })
  cesiumStore.cesium.eventHandler.register({
    type: 'LeftClick',
    id: 'createEntity',
    callBack: (e) => {
      popupStore.openPop({
        title: '添加实体',
        type: 'createEntity',
        data: {
          position: e.position,
          type: modelInfo.type,
          fakeType: modelInfo.fakeType
        }
      })
      cesiumStore.cesium.eventHandler.remove({
        type: 'LeftClick',
        id: 'createEntity'
      })
      activeIndex.value = -1
      tooltipStore.closeToolTip()
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
  position: relative;
}
.card-img {
  border: 2px solid #145780;
  position: relative;
}
.card-active {
  border-color: rgb(0, 128, 255);
  position: relative;
}
.card-active::before,
.card-active::after {
  content: '';
  display: block;
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -5px;
  border: 2px solid #00f3fe;
  transition: all 0.5s;
  animation: clippath 3s infinite linear;
  border-radius: 10px;
}

.card-active:after {
  animation: clippath 3s infinite -1.5s linear;
}
@keyframes clippath {
  0%,
  100% {
    clip-path: inset(0 0 98% 0);
  }

  25% {
    clip-path: inset(0 98% 0 0);
  }
  50% {
    clip-path: inset(98% 0 0 0);
  }
  75% {
    clip-path: inset(0 0 0 98%);
  }
}
</style>
