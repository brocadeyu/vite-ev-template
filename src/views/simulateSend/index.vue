<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="ss-container">
    <BaseDocker
      :title="'模拟发送'"
      :height="'450px'"
      :width="'1000px'"
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
                    @change="handleCustomMessageChange"
                  />
                  <!-- <el-select
                    v-model="formData.customMessage"
                    placeholder="请选择"
                    no-data-text="暂无数据"
                    @change="handleCustomMessageChange"
                  >
                    <el-option
                      v-for="(item, index) in customMessageTypeOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select> -->
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="12">
                <el-form-item label="时间"></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="位置姿态数据"></el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="速度"></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="目标ID"></el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="弹目距离"></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="雷达类型"></el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="雷达俯仰角"></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="雷达开机时间"></el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="方位波束宽度"></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="雷达搜索方位角"></el-form-item>
              </el-col>
            </el-row> -->
            <el-row>
              <el-col :span="24">
                <el-form-item :label="`原始消息预览`">
                  <el-table
                    :scrollbar-always-on="true"
                    height="125"
                    :data="tableData"
                    style="
                      --el-table-border-color: none;
                      --el-table-bg-color: #0b1a38;
                      width: 100%;
                    "
                    :header-cell-style="{
                      fontSize: '12px',
                      height: '20',
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
                    <el-table-column label="00 01" :align="'center'" prop="ZGS">
                    </el-table-column>
                    <el-table-column
                      label="02 03 04 05 06"
                      :align="'center'"
                      prop="LBS"
                    >
                    </el-table-column>
                    <el-table-column
                      label="07 08 09"
                      :align="'center'"
                      prop="LZBS"
                    >
                    </el-table-column>
                    <el-table-column
                      label="10 11 12 ... 124 125 126"
                      :align="'center'"
                      prop="XXZD"
                    >
                      <template #default="scope">
                        <el-tooltip
                          :content="binaryMessageLastNum"
                          :disabled="scope.row.XXZD == '信息字段'"
                          placement="top"
                          effect="light"
                        >
                          <span>
                            {{ scope.row.XXZD }}
                          </span>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column label="127" :align="'center'" prop="JOJY">
                    </el-table-column>
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
import { getNowTimeStr } from '@/common/helper'
import { c10To2 } from '@/common/helper'
const formData = reactive({
  deviceOne: '',
  deviceTwo: '',
  textOne: '',
  textTwo: '',
  customMessage: ''
})
const deviceOptions = ref([])
const textOneOptions = ref([])
const messageWZ = reactive({}) //武装直升机消息内容
const messageZC = reactive({}) //武装直升机消息内容
const messageC = reactive({}) //武装直升机消息内容
const messageD = reactive({}) //武装直升机消息内容
const tableData = ref([
  //表格数据
  {
    ZGS: '字格式',
    LBS: '综合链标识',
    LZBS: '综合链子标识',
    XXZD: '信息字段',
    JOJY: '奇偶校验'
  },
  {
    ZGS: '10',
    LBS: '-',
    LZBS: '-',
    XXZD: '-',
    JOJY: '-'
  }
])
const binaryMessageLastNum = ref('') //自定义消息二进制末尾数字
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
const customMessageTypeOptions = [
  {
    label: '武装直升机',
    value: '武装直升机'
  },
  {
    label: '侦察直升机',
    value: '侦察直升机'
  },
  {
    label: '中国052C型驱逐舰',
    value: '中国052C型驱逐舰'
  },
  {
    label: '中国052D型驱逐舰',
    value: '中国052D型驱逐舰'
  }
]
const dbTextData = ref([])
const textOne = ref(null)
const textTwoNum = ref(null)
const buling = (a, length) => {
  return a.padStart(length, 0)
}
//奇偶校验
const parityCheck = () => {
  // console.log(this.tableData[1])
  if (
    tableData.value[1].LBS !== '-' &&
    tableData.value[1].LZBS !== '-' &&
    tableData.value[1].XXZD !== '-'
  ) {
    const validateString =
      '10' +
      c10To2(textOne.value.n) +
      c10To2(textTwoNum.value) +
      binaryMessageLastNum.value
    // console.log('validateString', validateString)
    return checkParity(validateString)
  } else {
    return '-'
  }
}
const checkParity = (binaryString) => {
  // 将二进制字符串转换为数组
  const binaryArray = binaryString.split('').map(Number)

  // 计算二进制数组中 1 的个数
  const onesCount = binaryArray.reduce((count, bit) => count + bit, 0)
  if (onesCount % 2 === 0) {
    return 0
  } else {
    return 1
  }
  // 判断奇偶性
  // return onesCount % 2 === 0 ? "偶校验通过" : "奇校验通过";
}
const handleTextOneChange = (val) => {
  // console.log('ddd', this.dbData, val)
  const ws = Number.isNaN(Number(val.substring(val.length - 2))) //判断尾数两位是否都是数字
  // console.log('ws', ws)
  textOne.value = dbTextData.value.find(
    (item) =>
      item.nname === val.substring(0, val.length - (ws ? 1 : 2)) &&
      item.n === val.substring(val.length - (ws ? 1 : 2))
  )
  // console.log('textOneChange', formData.textOne, val)
  tableData.value[1].LBS = buling(c10To2(Number(textOne.value.n)), 5)
  formData.textTwo = ''
  tableData.value[1].LZBS = '-'
  tableData.value[1].JOJY = '-'
}
const handleTextTwoChange = (val) => {
  // console.log('textOneChange', val)
  if (textOne.value) {
    for (const key in textOne.value) {
      // console.log(key, this.textOne[key])
      if (textOne.value[key] === val && key !== 'nname') {
        tableData.value[1].LZBS = buling(c10To2(Number(key.substring(1, 2))), 3)
        textTwoNum.value = Number(key.substring(1, 2))
        // this.tableData[1].JOJY =
        //   Number(key.substring(1, 2)) & Number(this.textOne.n);
      }
    }
  }
  tableData.value[1].JOJY = parityCheck()
}
const handleCustomMessageChange = (val) => {
  console.log(val)
  const encoder = new TextEncoder()
  const utf8Bytes = encoder.encode(val)
  let result = ''
  utf8Bytes.forEach((item) => {
    result += buling(c10To2(item), 8)
  })
  // console.log('rrrr', result)
  binaryMessageLastNum.value = result
  tableData.value[1].XXZD = val
  // console.log('tableData', tableData.value)
  // console.log('UTF-8 二进制数据:', utf8Bytes, '最后一位', this.lastMessageNum)
  tableData.value[1].JOJY = parityCheck()
}
const closeTab = () => {
  window.close()
}
const sendMessage = () => {
  const ws = Number.isNaN(
    Number(formData.textOne.substring(formData.textOne.length - 2))
  )
  const convertTextOne = formData.textOne.substring(
    0,
    formData.textOne.length - (ws ? 1 : 2)
  )

  let data = {
    InteractType: 'baseInter.EntiyInter.VirtualInteract.SimulateSend',
    deviceSend: formData.deviceOne,
    deviceReceive: formData.deviceTwo,
    textMain: convertTextOne,
    textSub: formData.textTwo,
    customMessage: formData.customMessage
  }
  // console.log(d)
  // wss1.send(JSON.stringify(d))
  // this.$message({
  //   message: '发送成功',
  //   type: 'success'
  // })
  bc.postMessage(data)

  console.log('发送时间', data, getNowTimeStr())
}
let bc: BroadcastChannel = null
onMounted(async () => {
  const deviceList: string[] = JSON.parse(
    sessionStorage.getItem('simulateSend-deviceList')
  )
  // console.log('simulateSend-deviceList', deviceList)
  deviceOptions.value = deviceList.map((_) => {
    return { label: _, value: _ }
  })
  dbTextData.value = await getSimulateSendDBText()
  // console.log(dbTextData.value)
  textOneOptions.value = dbTextData.value.map((item) => {
    return {
      label: item.nname + item.n,
      value: item.nname + item.n,
      num: item.n
    }
  })
  bc = new BroadcastChannel('simulateSend')
})
onBeforeUnmount(() => {
  bc.close()
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
.el-form-item {
  width: 100%;
}
</style>
