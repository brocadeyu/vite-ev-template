<template>
  <div class="nd-container">
    <BaseDocker
      :title="'入网设备'"
      :height="'280px'"
      :width="'450px'"
      icon="link"
    >
      <template #content>
        <div class="nd-content">
          <div class="nd-item">
            <div class="item-img">
              <img :src="Air" />
            </div>
            <div class="item-text">武装直升机</div>
            <div class="item-num">5</div>
          </div>
          <div class="nd-item">
            <div class="item-img"><img :src="Air" /></div>
            <div class="item-text">侦察直升机</div>
            <div class="item-num">5</div>
          </div>
          <div class="nd-item">
            <div class="item-img"><img :src="Ship" /></div>
            <div class="item-text">中国052C型驱逐舰</div>
            <div class="item-num">5</div>
          </div>
          <div class="nd-item">
            <div class="item-img"><img :src="Ship" /></div>
            <div class="item-text">中国052D型驱逐舰</div>
            <div class="item-num">5</div>
          </div>
        </div>
      </template>
    </BaseDocker>
  </div>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
import Air from '@/assets/air.png'
import Ship from '@/assets/ship.png'
</script>

<style scoped>
.nd-container {
  position: fixed;
  top: 65vh;
  left: 20px;
}
.nd-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.nd-item {
  flex: 1;
  display: flex;
  align-items: center;
  /* background: #bb2929; */
}
.item-img {
  flex: 1;
  display: flex;
  justify-content: center;
  height: 60%;
}
.item-text {
  flex: 1;
  color: white;
}
.item-num {
  flex: 1;
  display: flex;
  justify-content: center;
  font-size: 45px;
  color: #16b7bf;
  font-family: 'DigitalNum';
}
</style>
