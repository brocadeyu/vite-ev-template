<template>
  <div class="cb-container">
    <div class="cb-content">
      <el-button circle size="small" color="transparent">
        <el-icon :size="24"><i-ep-VideoPlay /></el-icon>
      </el-button>
      步长:
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
const stepSize = ref('200')
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
.cb-container {
  position: fixed;
  top: 10vh;
  right: 7vw;
}
.cb-content {
  height: 40px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #ffffff38;
  border-radius: 5px;
  padding: 0 5px;
}
.el-button {
  margin-left: 0px;
}
</style>
