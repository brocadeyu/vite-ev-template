<template>
  <div v-if="showMask" class="lm-container">
    <div class="load-content">
      <el-progress
        type="circle"
        :percentage="parseInt(progress * 100)"
        :format="forMatCircle"
        text-color="white"
      ></el-progress>
    </div>
  </div>
</template>
<script setup lang="ts">
import { FakeProgress } from '@/utils/fakeProgress'
const forMatCircle = (p) => {
  return `加载中:${p}%`
}
const showMask = ref(true)
const fake = new FakeProgress({
  timeConstant: 6000,
  autoStart: true
})
const progress = ref(0)

Object.defineProperty(fake, 'progress', {
  set(val) {
    progress.value = val
  },
  get() {
    return progress.value
  }
})
const endProgress = () => {
  fake.end()
  setTimeout(() => {
    showMask.value = false
  }, 500)
}
// setTimeout(() => {
//   endProgress()
// }, 5000)
defineExpose({
  endProgress
})
</script>

<style scoped>
.lm-container {
  position: fixed;
  /* z-index: 10; */
}
.load-content {
  height: 100vh;
  width: 100vw;
  background-color: #000000b0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s ease-in;
}
</style>
