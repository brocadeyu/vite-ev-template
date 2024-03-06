<template>
  <div class="em-container">
    <div style="height: 80px; width: 450px; background-color: #ffffff38">
      <el-button circle size="small">
        <el-icon :size="18"><i-ep-VideoPlay /></el-icon>
      </el-button>
      步长：
      <el-select
        v-model="stepSize"
        placeholder="Select"
        size="small"
        style="width: 140px"
      >
        <el-option
          v-for="item in stepOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button size="small">生成文档</el-button>
      <el-button size="small">模拟发送</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const stepSize = ref('')
const stepOptions = [
  {
    value: '200',
    label: '200ms'
  },
  {
    value: '1000',
    label: '1000ms'
  }
]
</script>

<style scoped>
.em-container {
  position: fixed;
  top: 10vh;
  right: 7vw;
}
</style>
