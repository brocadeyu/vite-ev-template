<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="想定名称" prop="name" width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          删除
        </el-button>
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          修改
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { getThoughtList } from '@/api/thought'
import { onMounted, ref } from 'vue'
const tableData = ref([])
const handleEdit = (a, b) => {}
const handleDelete = (a, b) => {}
onMounted(async () => {
  const list: any = await getThoughtList()
  tableData.value = list
})
</script>

<style scoped></style>
