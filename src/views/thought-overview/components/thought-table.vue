<template>
  <div class="table-container">
    <div>
      <el-button
        type="primary"
        color="#119aa0"
        :icon="Plus"
        @click="toCreateView"
        >新建想定</el-button
      >
      <el-button type="danger" :icon="DeleteFilled">一键删除</el-button>
    </div>
    <el-table
      v-loading="showLoading"
      element-loading-text="拼命加载中"
      element-loading-background="rgba(12, 21, 42, 0.8)"
      :data="tableData"
      style="width: 100%; margin-top: 20px; --el-table-border-color: none"
      :header-cell-style="{
        fontSize: '18px',
        height: '40px',
        color: 'white',
        backgroundColor: '#2b4859',
        borderBottom: '0.5px #143275 solid'
      }"
      :cell-style="{
        color: '#fff',
        fontSize: '20px',
        borderBottom: '0.5px #143275 solid'
      }"
      :row-style="{
        fontSize: '20px',
        height: '60px',
        backgroundColor: '#0b1a38',
        color: 'white'
      }"
    >
      <el-table-column type="selection" width="80" />
      <el-table-column label="想定名称" prop="name"> </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="danger"
            :icon="Delete"
            @click="deleteThoughtItem(scope.row)"
          >
            删除
          </el-button>
          <el-button type="primary" :icon="Edit" @click="toEditView(scope.row)">
            修改
          </el-button>
          <!-- <el-button type="success" @click="() => {}"> 详情 </el-button> -->
          <el-button
            color="#626aef"
            :icon="VideoPlay"
            @click="toReplayView(scope.row)"
          >
            开始
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty
          description="暂无数据"
          style="background-color: transparent"
        />
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {
  Plus,
  Delete,
  DeleteFilled,
  Edit,
  VideoPlay
} from '@element-plus/icons-vue'
import { getThoughtList } from '@/api/thought'
import { useThoughtStore } from '@/stores/thougthStore'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { RawThought } from '@/common/interface/thought'
import { deleteThoughtById } from '@/api/thought'
const tableData = ref([])
const showLoading = ref(true)
const thoughtStore = useThoughtStore()
const router = useRouter()

const toCreateView: () => void = () => {
  thoughtStore.initThoughtStore()
  router.push({
    path: `/dataLink/thought/create`
  })
}
const toEditView: (row: RawThought) => void = (row) => {
  thoughtStore.initThoughtStore(row)
  router.push({
    path: `/dataLink/thought/edit/${row.name}`
  })
}
const toReplayView: (row: RawThought) => void = (row) => {
  thoughtStore.initThoughtStore(row)
  router.push({
    path: `/dataLink/thought/replay/${row.name}`
  })
}

const deleteThoughtItem: (row: RawThought) => void = async (row) => {
  const { id } = row
  try {
    await deleteThoughtById(id)
    await fetchThoughtList()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error)
  }
}
const fetchThoughtList = async () => {
  try {
    showLoading.value = true
    const list: any = await getThoughtList()
    setTimeout(() => {
      showLoading.value = false
      tableData.value = list
    }, 500)
    // console.log(list)
  } catch (error) {
    showLoading.value = false
  }
}

onMounted(() => {
  fetchThoughtList()
})
</script>

<style scoped>
.table-container {
  height: 100%;
  /* margin-top: 8vh; */
  padding: 30px;
  /* background-color: #0b1a39; */
  background-color: #0b1a39d1;
  border: 2px solid #119aa0;
  box-sizing: border-box;
}
.el-table {
  --el-table-row-hover-bg-color: rgb(28, 62, 113);
}
:deep(.el-table__empty-block) {
  background-color: #0b1a39;
}

:deep(.el-checkbox__input .el-checkbox__inner) {
  background-color: transparent !important;
  border-color: #119aa0;
}
:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: rgb(47, 99, 244) !important;
}
</style>
