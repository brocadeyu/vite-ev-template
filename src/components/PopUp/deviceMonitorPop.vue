<!-- eslint-disable camelcase -->
<template>
  <BaseDocker
    :title="title"
    :show-footer="true"
    :height="'635px'"
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
        <div style="height: calc(100% - 30px)">
          <el-table
            element-loading-text="拼命加载中"
            element-loading-background="rgba(12, 21, 42, 0.8)"
            :data="tableData"
            style="
              width: 100%;
              margin-top: 20px;
              --el-table-border-color: none;
              --el-table-bg-color: transparent;
            "
            height="100%"
            scrollbar-always-on
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
        <el-pagination background layout="prev, pager, next" :total="1000" />
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
const closePop = () => {
  popupStore.closePop()
}
const tableData = ref([
  {
    deviceId: 'daaa-aaa-aa--aa',
    deviceName: '短波电台',
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
  height: 540px;
  padding: 5px;
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
</style>
