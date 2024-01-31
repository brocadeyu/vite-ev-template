<template>
  <el-button key="666" type="primary"> aaa </el-button>
  <el-table></el-table>
</template>

<script setup lang="ts">
import { getThoughtList } from '@/api/thought'
import { onMounted } from 'vue'

onMounted(async () => {
  const thoughList = await getThoughtList()
  console.log(thoughList)
})
</script>

<style scoped></style>
