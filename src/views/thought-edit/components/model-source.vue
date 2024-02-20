<template>
  <div class="ms-container">
    <BaseDocker :title="'模型资源'" :height="'200px'" :width="'200px'">
      <template #content>
        <div class="card-container">
          <div
            v-for="(item, index) in modelConfig"
            :key="index"
            class="card-item"
          >
            <img :src="item.img" width="60px" height="60px" />
            {{ item.name }}
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
const modelConfig = ref([
  {
    name: '武装直升机',
    img: WZImg
  },
  {
    name: '侦察直升机',
    img: ZCImg
  },
  {
    name: '中国052C型驱逐舰',
    img: SHIP052C
  },
  {
    name: '中国052D型驱逐舰',
    img: SHIP052D
  }
])
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
</style>
