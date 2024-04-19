<!-- eslint-disable camelcase -->
<template>
  <BaseDocker
    :title="title"
    :show-footer="true"
    :height="'733px'"
    :width="'1200px'"
    :is-draggable="true"
  >
    <template #header>
      <el-button type="primary" color="#119aa0" size="small" @click="closePop">
        <el-icon :size="16"><i-ep-Close /></el-icon>
      </el-button>
    </template>
    <template #content>
      <div class="mission-content">
        <div class="filter-content">
          <div class="filter-item">
            <span>所属平台</span>
            <el-select
              v-model="filterParams.pt"
              placeholder="Select"
              style="width: 180px; margin-left: 10px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="filter-item">
            <span>设备类型</span>
            <el-select
              v-model="filterParams.lx"
              placeholder="Select"
              style="width: 180px; margin-left: 10px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="filter-item">
            <span>设备编号</span>
            <el-select
              v-model="filterParams.bh"
              placeholder="Select"
              style="width: 180px; margin-left: 10px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="filter-item">
            <span>设备状态</span>
            <el-select
              v-model="filterParams.zt"
              placeholder="Select"
              style="width: 180px; margin-left: 10px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div
          style="
            height: calc(90%);
            border: 1px solid #095356;
            border-radius: 5px;
            overflow: hidden;
          "
        >
          <el-table
            element-loading-text="拼命加载中"
            element-loading-background="rgba(12, 21, 42, 0.8)"
            :data="tableData1"
            style="
              width: 100%;
              --el-table-border-color: none;
              --el-table-bg-color: transparent;
            "
            height="100%"
            scrollbar-always-on
            :header-cell-style="{
              fontSize: '18px',
              height: '30px',
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
              height: '50px',
              backgroundColor: '#0b1a38bf',
              color: 'white'
            }"
          >
            <el-table-column label="装备名称" prop="deviceId">
            </el-table-column>
            <el-table-column label="装备编号" prop="deviceName">
            </el-table-column>
            <el-table-column label="所属平台" prop="platName">
            </el-table-column>
            <el-table-column label="在线状态" prop="online">
              <template #default="scope">
                <span v-if="scope.row.online">
                  <i class="dotClass" style="background-color: springgreen"></i>
                </span>
                <span v-else>
                  <i class="dotClass" style="background-color: red"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="更新时间" prop="updateTime">
            </el-table-column>
            <template #empty>
              <el-empty
                description="暂无数据"
                style="background-color: transparent"
              />
            </template>
          </el-table>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="foot-btns">
        <el-pagination
          v-model:current-page="currentPage"
          style="
            --el-disabled-bg-color: #022f31;
            --el-pagination-hover-color: white;
            --el-pagination-button-bg-color: #0f6f74;
            --el-color-primary: #119aa0;
          "
          background
          layout="prev, pager, next"
          :total="100"
        />
      </div>
    </template>
  </BaseDocker>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
import { usePopupStore } from '@/stores/popupStore'
import { useMonitorStore } from '@/stores/monitorStore'
import { storeToRefs } from 'pinia'
const popupStore = usePopupStore()
const monitorStore = useMonitorStore()
const { monitorData } = storeToRefs(monitorStore)

const props = withDefaults(
  defineProps<{
    title?: string
  }>(),
  { title: '' }
)
const currentPage = ref(1)
const tableData = ref([])
const filterParams = reactive({
  pt: '',
  lx: '',
  bh: '',
  zt: ''
})
const options = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
]
watch(currentPage, (page) => {
  console.log('页数变化', page)
  const startIndex = (currentPage.value - 1) * 10
  const endIndex = startIndex + currentPage.value
  tableData.value = monitorData.value.slice(startIndex, endIndex)
})
watch(monitorData, (newVal) => {
  const startIndex = (currentPage.value - 1) * 10
  const endIndex = startIndex + currentPage.value
  tableData.value = newVal.slice(startIndex, endIndex)
})

const closePop = () => {
  popupStore.closePop()
}
const tableData1 = ref([
  {
    deviceId: 'daaa-aaa-aa--aa',
    deviceName: '短波电台',
    platName: '飞机2',
    online: true,
    updateTime: '2024'
  },
  {
    deviceId: 'daaa-aaa-aa--aa',
    deviceName: '短波电台',
    platName: '飞机2',
    online: true,
    updateTime: '2024'
  },
  {
    deviceId: 'daaa-aaa-aa--aa',
    deviceName: '短波电台',
    platName: '飞机2',
    online: true,
    updateTime: '2024'
  },
  {
    deviceId: 'daaa-aaa-aa--aa',
    deviceName: '短波电台',
    platName: '飞机2',
    online: true,
    updateTime: '2024'
  },
  {
    deviceId: 'daaa-aaa-aa--aa',
    deviceName: '短波电台',
    platName: '飞机2',
    online: true,
    updateTime: '2024'
  },
  {
    deviceId: 'daaa-aaa-aa--aa',
    deviceName: '短波电台',
    platName: '飞机2',
    online: true,
    updateTime: '2024'
  },
  {
    deviceId: 'daaa-aaa-aa--aa',
    deviceName: '短波电台',
    platName: '飞机2',
    online: true,
    updateTime: '2024'
  },
  {
    deviceId: 'daaa-aaa-aa--aa',
    deviceName: '短波电台',
    platName: '飞机2',
    online: true,
    updateTime: '2024'
  },
  {
    deviceId: 'daaa-aaa-aa--aa',
    deviceName: '1短波电台',
    platName: '飞机2',
    online: true,
    updateTime: '2024'
  },
  {
    deviceId: 'daaa-aaa-aa--aa',
    deviceName: '1短波电台',
    platName: '飞机2',
    online: true,
    updateTime: '2024'
  }
])
</script>

<style scoped>
.foot-btns {
  display: flex;
  justify-content: flex-end;
  margin-right: 2px;
}
.mission-content {
  height: 100%;
  padding: 5px;
  padding-bottom: 10px;
  padding-top: 0;
  box-sizing: border-box;
}
.dotClass {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: block;
  margin-left: 10px;
}
.el-table {
  --el-table-row-hover-bg-color: rgb(28, 62, 113);
}
::v-deep(.bd-footer) {
  height: 33px;
}
::v-deep(.el-select) {
  --el-fill-color-blank: transparent;
  --el-border-color: #0e9aa0;
  --el-text-color-placeholder: white;
  --el-border-color-hover: #16b0b8;
}
::v-deep(.el-pagination.is-background .btn-prev) {
  --el-pagination-button-bg-color: #119aa0;
}

::v-deep(.el-pagination.is-background .btn-next) {
  --el-pagination-button-bg-color: #119aa0;
}
::v-deep(.el-pagination.is-background .el-pager li.is-active) {
  background-color: #25bfc6;
}

.filter-content {
  height: 10%;
  display: flex;
  align-items: center;
  color: white;
}

.filter-item {
  flex: 1;
}
</style>
