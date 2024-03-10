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
                    @change="handleTextOneChange"
                  >
                    <el-option
                      v-for="(item, index) in textOneOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="子标识">
                  <el-select
                    v-model="formData.textTwo"
                    placeholder="请选择"
                    no-data-text="暂无数据"
                    @change="handleTextTwoChange"
                  >
                    <el-option
                      v-for="(item, index) in textTwoOptions"
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
import { getSimulateSendDBText } from '@/api/thought'
const formData = reactive({
  deviceOne: '',
  deviceTwo: '',
  customMessage: '',
  textOne: '',
  textTwo: ''
})
const deviceOptions = ref([])
const textOneOptions = ref([])
const textTwoOptions = computed(() => {
  if (textOne.value) {
    const result = [
      {
        label: textOne.value.m0 + '0',
        value: textOne.value.m0,
        num: '0'
      },
      {
        label: textOne.value.m1 + '1',
        value: textOne.value.m1,
        num: '1'
      },
      {
        label: textOne.value.m2 + '2',
        value: textOne.value.m2,
        num: '2'
      },
      {
        label: textOne.value.m3 + '3',
        value: textOne.value.m3,
        num: '3'
      },
      {
        label: textOne.value.m4 + '4',
        value: textOne.value.m4,
        num: '4'
      },
      {
        label: textOne.value.m5 + '5',
        value: textOne.value.m5,
        num: '5'
      },
      {
        label: textOne.value.m6 + '6',
        value: textOne.value.m6,
        num: '6'
      },
      { label: textOne.value.m7 + '7', value: textOne.value.m7, num: '7' }
    ]
    return result.filter((item) => !item.label.includes('null'))
  } else {
    return []
  }
})
const dbTextData = ref([])
const textOne = ref(null)
const handleTextOneChange = (val) => {
  // console.log('ddd', this.dbData, val)
  const ws = Number.isNaN(Number(val.substring(val.length - 2))) //判断尾数两位是否都是数字
  // console.log('ws', ws)
  textOne.value = dbTextData.value.find(
    (item) =>
      item.nname === val.substring(0, val.length - (ws ? 1 : 2)) &&
      item.n === val.substring(val.length - (ws ? 1 : 2))
  )
  console.log('textOneChange', formData.textOne, val)
  // this.tableData[1].LBS = this.buling(this.c10to2(Number(this.textOne.n)), 5)
  formData.textTwo = ''
  // this.tableData[1].LZBS = '-'
  // this.tableData[1].JOJY = '-'
}
const handleTextTwoChange = () => {}
const closeTab = () => {
  window.close()
}
const sendMessage = () => {}
onMounted(async () => {
  const deviceList: string[] = JSON.parse(
    sessionStorage.getItem('simulateSend-deviceList')
  )
  console.log('simulateSend-deviceList', deviceList)
  deviceOptions.value = deviceList.map((_) => {
    return { label: _, value: _ }
  })
  dbTextData.value = await getSimulateSendDBText()
  console.log(dbTextData.value)
  textOneOptions.value = dbTextData.value.map((item) => {
    return {
      label: item.nname + item.n,
      value: item.nname + item.n,
      num: item.n
    }
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
