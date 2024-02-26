<template>
  <BaseDocker
    :title="title"
    :show-footer="true"
    :height="'400px'"
    :width="'450px'"
    :is-draggable="true"
  >
    <template #content>
      <div class="gen-content">
        <el-tabs
          type="border-card"
          style="--el-fill-color-light: #0b1a39; --el-border-color: #0b1a39"
        >
          <el-tab-pane label="综合链">
            <el-row class="row-style">
              <el-col :span="24" class="col-style"
                >通信方式：点名呼叫轮询
              </el-col>
            </el-row>
            <el-row class="row-style">
              <el-col :span="10" class="col-style"><div>主设备：</div></el-col>
              <el-col :span="14" class="col-style">
                <el-select
                  key="综合链"
                  v-model="formDataZHL.mainDevice"
                  placeholder="请选择主设备"
                >
                  <!-- <el-option label="Zone one" value="shanghai" /> -->
                </el-select>
              </el-col>
            </el-row>
            <el-table
              ref="multipleTableRef"
              :data="devicesList"
              style="width: 100%; color: black"
              height="200"
              @selection-change="() => {}"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column :align="'center'" property="id" label="装备" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="90X链">
            <el-row class="row-style">
              <el-col :span="24" class="col-style"
                >通信方式：静态时隙分配
              </el-col>
            </el-row>
            <el-row class="row-style">
              <el-col :span="10" class="col-style"><div>主设备：</div></el-col>
              <el-col :span="14" class="col-style">
                <el-select
                  key="90X链"
                  v-model="formData90X.mainDevice"
                  placeholder="请选择主设备"
                >
                  <!-- <el-option label="Zone one" value="shanghai" /> -->
                </el-select>
              </el-col>
            </el-row>
            <el-table
              ref="multipleTableRef"
              :data="devicesList"
              style="width: 100%; color: black"
              height="200"
              @selection-change="() => {}"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column :align="'center'" property="id" label="装备" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="JIDS链">
            <el-row class="row-style">
              <el-col :span="24" class="col-style"
                >通信方式：动态时隙分配
              </el-col>
            </el-row>
            <el-row class="row-style">
              <el-col :span="10" class="col-style"><div>主设备：</div></el-col>
              <el-col :span="14" class="col-style">
                <el-select
                  key="JIDS链"
                  v-model="formDataJIDS.mainDevice"
                  placeholder="请选择主设备"
                >
                  <!-- <el-option label="Zone one" value="shanghai" /> -->
                </el-select>
              </el-col>
            </el-row>
            <el-table
              ref="multipleTableRef"
              :data="devicesList"
              style="width: 100%; color: black"
              height="200"
              @selection-change="() => {}"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column :align="'center'" property="id" label="装备" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="卫通">
            <el-row class="row-style">
              <el-col :span="24" class="col-style"> 通信方式：直连通信 </el-col>
            </el-row>
            <el-row class="row-style">
              <el-col :span="10" class="col-style"><div>主设备：</div></el-col>
              <el-col :span="14" class="col-style">
                <el-select
                  key="卫通"
                  v-model="formDataKu.mainDevice"
                  placeholder="请选择主设备"
                >
                  <!-- <el-option label="Zone one" value="shanghai" /> -->
                </el-select>
              </el-col>
            </el-row>
            <el-table
              ref="multipleTableRef"
              :data="devicesList"
              style="width: 100%; color: black"
              height="200"
              @selection-change="() => {}"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column :align="'center'" property="id" label="装备" />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
    <template #footer>
      <div class="foot-btns">
        <el-button type="primary" size="small" @click="closePopup"
          >取消</el-button
        >
        <el-button type="primary" size="small">保存</el-button>
      </div>
    </template>
  </BaseDocker>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
import { usePopupStore } from '@/stores/popupStore'
import { useEntityStore } from '@/stores/entityStore'
import { storeToRefs } from 'pinia'
const popupStore = usePopupStore()
const entityStore = useEntityStore()
const { entitiesArr } = storeToRefs(entityStore)
const props = withDefaults(
  defineProps<{
    title?: string
  }>(),
  { title: '' }
)
// const devicesList = ref([])
const devicesList = computed(() => {
  return entitiesArr.value.map((_) => {
    return { id: _.id }
  })
})

const formDataZHL = reactive({
  mainDevice: '',
  targets: []
})
const formData90X = reactive({
  mainDevice: '',
  targets: []
})
const formDataJIDS = reactive({
  mainDevice: '',
  targets: []
})
const formDataKu = reactive({
  mainDevice: '',
  targets: []
})

const closePopup = () => {
  popupStore.closePop()
}
onMounted(() => {})
</script>

<style scoped>
.gen-content {
  height: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  box-sizing: border-box;
}
.tab-card {
  height: 100%;
  /* background-color:; */
}
::v-deep(.el-tabs) {
  /* background-color: red; */
  height: 100%;
}
::v-deep(.el-tabs .el-tabs__content) {
  height: calc(100% - 70px);
}
/* .el-tabs--border-card .el-tabs__header {
  background-color: red;
} */
.tx-fs {
  height: 20px;
  padding-bottom: 10px;
}
.foot-btns {
  display: flex;
  justify-content: flex-end;
}
.row-style {
  height: 35px;
}
.col-style {
  display: flex;
  align-items: center;
}
</style>
