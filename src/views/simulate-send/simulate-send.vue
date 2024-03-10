<template>
  <div class="ss-container">
    <BaseDocker
      :title="'模拟发送'"
      :height="'400px'"
      :width="'800px'"
      icon="log"
      :show-footer="true"
    >
      <template #header>
        <el-button
          type="primary"
          color="#119aa0"
          size="small"
          @click="closeTab"
        >
          <el-icon :size="16"><i-ep-Close /></el-icon>
        </el-button>
      </template>
      <template #content>
        <div class="ss-content">
          <el-form
            ref="formRef"
            :inline="true"
            :model="formData"
            label-width="auto"
            label-position="left"
            class="entity-form"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="发送平台">
                  <el-select
                    v-model="formData.deviceOne"
                    placeholder="请选择"
                    no-data-text="暂无数据"
                  >
                    <el-option
                      v-for="(item, index) in deviceOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="接收平台">
                  <el-select
                    v-model="formData.deviceTwo"
                    placeholder="请选择"
                    no-data-text="暂无数据"
                  >
                    <el-option
                      v-for="(item, index) in deviceOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="标识">
                  <el-select
                    v-model="formData.textOne"
                    placeholder="请选择"
                    no-data-text="暂无数据"
                  >
                    <!-- <el-option
                      v-for="(item, index) in formDataZHL.targets"
                      :key="index"
                      :label="item.id"
                      :value="item.id"
                    /> -->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="子标识">
                  <el-select
                    v-model="formData.textTwo"
                    placeholder="请选择"
                    no-data-text="暂无数据"
                  >
                    <!-- <el-option
                      v-for="(item, index) in formDataZHL.targets"
                      :key="index"
                      :label="item.id"
                      :value="item.id"
                    /> -->
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="自定义消息">
                  <el-input
                    v-model="formData.customMessage"
                    placeholder="请输入消息内容"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="`原始消息预览`">
                  <el-table
                    :scrollbar-always-on="true"
                    height="125"
                    :data="[]"
                    style="
                      --el-table-border-color: none;
                      --el-table-bg-color: #0b1a38;
                    "
                    :header-cell-style="{
                      fontSize: '12px',
                      height: '40px',
                      color: 'white',
                      backgroundColor: '#2b4859',
                      borderBottom: '0.5px #143275 solid'
                    }"
                    :cell-style="{
                      color: '#fff',
                      height: '20px',
                      fontSize: '12px',
                      borderBottom: '0.5px #143275 solid'
                    }"
                    :row-style="{
                      fontSize: '20px',
                      height: '20px',
                      backgroundColor: '#0b1a38',
                      color: 'white'
                    }"
                  >
                    <!-- <el-table-column
                      prop="index"
                      label="序号"
                      :align="'center'"
                    >
                      <template #default="scope">
                        <span>{{ scope.$index + 1 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="pos"
                      :label="`位置（${formData.path.length})`"
                      :align="'center'"
                      width="120"
                    >
                    </el-table-column>
                    <el-table-column :align="'center'" width="160">
                      <template #header>
                        <div style="display: flex">
                          <el-button
                            type="primary"
                            size="small"
                            color="#119aa0"
                            :class="{ 'mark-point-active': isPickPathStatus }"
                            @click="editPath"
                            >标绘<el-icon :size="16"><i-ep-Aim /></el-icon
                          ></el-button>
                          <el-button
                            type="primary"
                            size="small"
                            color="#119aa0"
                            @click="resetPath"
                            >重置<el-icon :size="16"
                              ><i-ep-RefreshRight /></el-icon
                          ></el-button>
                        </div>
                      </template>
                    </el-table-column> -->
                  </el-table>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div class="foot-btns">
          <el-button
            type="primary"
            color="#119aa0"
            size="small"
            @click="sendMessage"
            >发送</el-button
          >
        </div>
      </template>
    </BaseDocker>
  </div>
</template>
<script setup lang="ts">
const formData = reactive({
  deviceOne: '',
  deviceTwo: '',
  customMessage: '',
  textOne: '',
  textTwo: ''
})
const deviceOptions = ref([])
const closeTab = () => {
  window.close()
}
const sendMessage = () => {}
onMounted(() => {
  const deviceList: string[] = JSON.parse(
    sessionStorage.getItem('simulateSend-deviceList')
  )
  console.log('simulateSend-deviceList', deviceList)
  deviceOptions.value = deviceList.map((_) => {
    return { label: _, value: _ }
  })
})
</script>

<style scoped>
.ss-container {
  height: 100vh;
  width: 100vw;
  background-color: beige;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
}
.foot-btns {
  display: flex;
  justify-content: flex-end;
}
.entity-form {
  padding: 15px;
  color: white;
}
.entity-form .el-input {
  --el-input-width: 220px;
  --el-input-bg-color: #0c1a39;
  --el-disabled-bg-color: #0c1a39;
  --el-input-hover-border-color: #16b0b8;
  --el-input-border-color: #0e9aa0;
  --el-disabled-border-color: #0d6e71;
  --el-fill-color-light: transparent;
  --el-color-info: white;
}
.entity-form .el-select {
  --el-select-width: 220px;
}
::v-deep(.el-select) {
  --el-fill-color-blank: transparent;
  --el-border-color: #0e9aa0;
  --el-text-color-placeholder: white;
  --el-border-color-hover: #16b0b8;
}
</style>
