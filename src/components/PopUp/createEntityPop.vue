<template>
  <base-docker
    :title="title"
    :show-footer="true"
    :height="'500px'"
    :width="'480px'"
    :is-draggable="true"
    :bg="getEntityImgByType(data.type)"
  >
    <template #content>
      <el-form
        ref="formRef"
        :inline="true"
        :model="formData"
        class="entity-form"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型">
              <el-input
                v-model="formData.fakeType"
                disabled
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="名称"
              prop="name"
              :rules="[
                {
                  required: true,
                  message: '名称不可为空',
                  trigger: 'change'
                },
                {
                  validator: validatePass2,
                  trigger: 'change'
                }
              ]"
            >
              <el-input
                v-model="formData.name"
                placeholder="请输入名称"
                clearable
                size="small"
              /> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="位置">
              <el-input
                :value="formData.position"
                disabled
                :placeholder="`经度:${data.position[0]},纬度:${data.position[1]}`"
                clearable
                size="small"
              >
                <template #append>
                  <el-button
                    :class="{ 'mark-point-active': isPickPointStatus }"
                    type="primary"
                    size="small"
                    @click="pickPoint"
                  >
                    <el-icon size="16"><i-ep-location /></el-icon>
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="`航线`">
              <el-table
                size="small"
                :scrollbar-always-on="true"
                height="125"
                :data="formData.path"
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
                <el-table-column prop="index" label="序号" :align="'center'">
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
                        >重置<el-icon :size="16"><i-ep-RefreshRight /></el-icon
                      ></el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="装备配置">
              <div v-for="(item, index) in formData.equipment" :key="index">
                <el-checkbox v-model="item.isHas" size="small">{{
                  item.name
                }}</el-checkbox>
                <el-switch
                  v-model="item.isUse"
                  size="small"
                  :disabled="!item.isHas"
                  active-color="#13ce66"
                  inactive-color="#d7d7d7"
                >
                </el-switch>
              </div> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="电台参数">
              <el-button
                type="primary"
                color="#119aa0"
                size="small"
                @click="showParamSet"
                >设置</el-button
              >
            </el-form-item></el-col
          >
          <el-dialog
            v-model="dialogFormVisible"
            title="参数设置"
            width="1200"
            align-center
            :show-close="false"
            style="
              --el-bg-color: #2b6c7c;
              --el-input-bg-color: white;
              --el-input-text-color: black;
            "
          >
            <el-form v-if="zhlActive" class="area">
              <div class="textOne">综合链</div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="短波频率" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="paramsForm.db"
                      :min="3"
                      :max="30"
                      controls-position="right"
                    /><span class="unit-text">MHz</span>
                  </el-form-item></el-col
                >
                <el-col :span="8">
                  <el-form-item
                    label="超短波频率"
                    :label-width="formLabelWidth"
                  >
                    <el-input-number
                      v-model="paramsForm.cdb"
                      :min="225"
                      :max="600"
                      controls-position="right"
                    /><span class="unit-text">MHz</span>
                  </el-form-item></el-col
                >
                <el-col :span="8">
                  <el-form-item label="出联方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.clfs"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                      disabled
                    >
                      <el-option label="定频" value="定频" />
                      <el-option label="跳频" value="跳频" />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    label="传输速率-短波定频"
                    :label-width="formLabelWidth"
                  >
                    <el-input-number
                      v-model="paramsForm.cssldp"
                      :min="1120"
                      :max="4053"
                      controls-position="right"
                    /><span class="unit-text">bps</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="传输速率-短波跳频"
                    :label-width="formLabelWidth"
                  >
                    <el-input-number
                      v-model="paramsForm.cssltp"
                      :min="500"
                      :max="2200"
                      controls-position="right"
                    /><span class="unit-text">bps</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="传输速率-超短波定频"
                    :label-width="formLabelWidth"
                  >
                    <el-input-number
                      v-model="paramsForm.csslcdb"
                      :min="12667"
                      :max="12667"
                      controls-position="right"
                    /><span class="unit-text">bps</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="调制方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.tzfs"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                    >
                      <el-option label="8PSK" value="8PSK" />
                      <el-option label="16QAM" value="16QAM" />
                      <el-option label="32QAM" value="32QAM" />
                      <el-option label="64QAM" value="64QAM" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="8"
                  ><el-form-item label="工作模式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.gzms"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                    >
                      <el-option label="TDMA-时分多址" value="TDMA-时分多址" />
                      <el-option label="动态TDMA" value="动态TDMA" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="8"
                  ><el-form-item label="消息格式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.xxgs"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                    >
                      <el-option label="F序列" value="8PSK" />
                      <el-option label="FJ序列" value="FJ序列" />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
            </el-form>
            <el-form v-if="xActive" class="area">
              <div class="textOne">90X链</div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="短波频率" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="paramsForm.db1"
                      :min="15"
                      :max="30"
                      controls-position="right"
                    /><span class="unit-text">MHz</span>
                  </el-form-item></el-col
                >
                <el-col :span="8">
                  <el-form-item
                    label="超短波频率"
                    :label-width="formLabelWidth"
                  >
                    <el-input-number
                      v-model="paramsForm.cdb1"
                      :min="225"
                      :max="400"
                      controls-position="right"
                    />
                    <span class="unit-text">MHz</span></el-form-item
                  ></el-col
                >
                <el-col :span="8">
                  <el-form-item label="出联方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.clfs1"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                      disabled
                    >
                      <el-option label="定频" value="定频" />
                      <el-option label="跳频" value="跳频" />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="调制方式-短波"
                    :label-width="formLabelWidth"
                  >
                    <el-select
                      v-model="paramsForm.tzfs1db"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                    >
                      <el-option label="SSB-Π/4DQPSK" value="SSB-Π/4DQPSK" />
                      <el-option label="SSB-8PSK" value="SSB-8PSK" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="12">
                  <el-form-item
                    label="调制方式-超短波"
                    :label-width="formLabelWidth"
                  >
                    <el-select
                      v-model="paramsForm.tzfs1cdb"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                      disabled
                    >
                      <el-option label="FM-8PSK" value="FM-8PSK" />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="传输速率-短波"
                    :label-width="formLabelWidth"
                  >
                    <el-input-number
                      v-model="paramsForm.cssldp1"
                      :min="1200"
                      :max="1200"
                      controls-position="right"
                    /><span class="unit-text">bps</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="传输速率-超短波"
                    :label-width="formLabelWidth"
                  >
                    <el-input-number
                      v-model="paramsForm.csslcdb1"
                      :min="2250"
                      :max="2250"
                      controls-position="right"
                    /><span class="unit-text">bps</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12"
                  ><el-form-item label="工作模式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.gzms1"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                      disabled
                    >
                      <el-option label="点名轮询呼叫" value="点名轮询呼叫" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item label="消息格式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.xxgs1"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                      disabled
                    >
                      <el-option label="M系列" value="M系列" />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
            </el-form>
            <el-form v-if="jidsActive" class="area">
              <div class="textOne">JIDS链</div>
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    label="超短波频率"
                    :label-width="formLabelWidth"
                  >
                    <el-input-number
                      v-model="paramsForm.cdb2"
                      :min="960"
                      :max="1215"
                      controls-position="right"
                    /><span class="unit-text">MHz</span>
                  </el-form-item></el-col
                >
                <el-col :span="8">
                  <el-form-item label="出联方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.clfs2"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                    >
                      <el-option label="定频" value="定频" />
                      <el-option label="跳频" value="跳频" />
                    </el-select> </el-form-item
                ></el-col>

                <el-col :span="8">
                  <el-form-item label="调制方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.tzfs2"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                      disabled
                    >
                      <el-option label="MSK" value="MSK" />
                    </el-select>
                    <!-- 超短波
                    <el-select
                      v-model="paramsForm.tzfs1cdb"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                      disabled
                    >
                      <el-option label="FM-8PSK" value="FM-8PSK" />
                    </el-select> -->
                  </el-form-item></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="传输速率" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="paramsForm.cssl2"
                      :min="28800"
                      :max="238000"
                      controls-position="right"
                    /><span class="unit-text">bps</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8"
                  ><el-form-item label="工作模式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.gzms2"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                      disabled
                    >
                      <el-option label="TDMA-时分多址" value="TDMA-时分多址" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="8"
                  ><el-form-item label="消息格式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.xxgs1"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                      disabled
                    >
                      <el-option label="J序列" value="J序列" />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
            </el-form>
            <el-form v-if="kuActive" class="area">
              <div class="textOne">卫星通信</div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="卫星编号" :label-width="formLabelWidth">
                    <el-input v-model="paramsForm.wxbh" /> </el-form-item
                ></el-col>
                <el-col :span="8">
                  <el-form-item label="出联方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.clfs3"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                    >
                      <el-option label="定频" value="定频" />
                      <el-option label="跳频" value="跳频" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="8">
                  <el-form-item label="工作频率" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="paramsForm.gzpl"
                      :min="1000"
                      :max="9999999999"
                      controls-position="right"
                    /><span class="unit-text">MHz</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8"
                  ><el-form-item label="极化方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.jhfs"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                      disabled
                    >
                      <el-option label="H" value="H" />
                      <el-option label="V" value="V" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="8"
                  ><el-form-item
                    label="上下行标志"
                    :label-width="formLabelWidth"
                  >
                    <el-select
                      v-model="paramsForm.sxx"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                      disabled
                    >
                      <el-option label="U-上行" value="U-上行" />
                      <el-option label="D-下行" value="D-下行" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="8"
                  ><el-form-item label="调制方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.tzfs3"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                      disabled
                    >
                      <el-option label="2FSK" value="2FSK" />
                      <el-option label="MSK" value="MSK" />
                      <el-option label="BPSK" value="BPSK" />
                      <el-option label="QPSK" value="QPSK" />
                      <el-option label="BPSK" value="BPSK" />
                      <el-option label="16QAM" value="16QAM" />
                      <el-option label="32QAM" value="32QAM" />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"
                  ><el-form-item label="采样率" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="paramsForm.cyl"
                      :min="1000"
                      :max="9999999999"
                      controls-position="right"
                    /><span class="unit-text">KHz</span>
                  </el-form-item></el-col
                >
                <el-col :span="8"
                  ><el-form-item label="调制速率" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="paramsForm.tzsl"
                      :min="1000"
                      :max="9999999999"
                      controls-position="right"
                    /><span class="unit-text">KHz</span>
                  </el-form-item></el-col
                >
              </el-row>
            </el-form>
            <el-form v-if="dbActive" class="area">
              <div class="textOne">短波</div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="短波频率" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="paramsForm.gzpldb"
                      :min="1.5"
                      :max="30"
                      controls-position="right"
                    /><span class="unit-text">MHz</span>
                  </el-form-item></el-col
                >
                <el-col :span="8">
                  <el-form-item label="短波带宽" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="paramsForm.dkdb"
                      :min="2.4"
                      :max="50"
                      controls-position="right"
                    /><span class="unit-text">KHz</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出联方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.clfsdb"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                    >
                      <el-option label="定频" value="定频" />
                      <el-option label="跳频" value="跳频" />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"
                  ><el-form-item label="调制方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.tzfsdb"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                    >
                      <el-option label="AM" value="AM" />
                      <el-option label="FM" value="FM" />
                      <el-option label="2FSK" value="2FSK" />
                      <el-option label="MSK" value="MSK" />
                      <el-option label="BPSK" value="BPSK" />
                      <el-option label="QPSK" value="QPSK" />
                      <el-option label="BPSK" value="BPSK" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="8"
                  ><el-form-item label="调制速率" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="paramsForm.tzsldb"
                      :min="1000"
                      :max="9999999999"
                      controls-position="right"
                    /><span class="unit-text">KHz</span>
                  </el-form-item></el-col
                >
                <el-col :span="8"
                  ><el-form-item label="采样率" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="paramsForm.cyldb"
                      :min="1000"
                      :max="9999999999"
                      controls-position="right"
                    />
                    <span class="unit-text">KHz</span></el-form-item
                  ></el-col
                >
              </el-row>
            </el-form>
            <el-form v-if="cdbActive" class="area">
              <div class="textOne">超短波</div>
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    label="超短波频率"
                    :label-width="formLabelWidth"
                  >
                    <el-input-number
                      v-model="paramsForm.gzplcdb1"
                      :min="30"
                      :max="3000"
                      controls-position="right"
                    /><span class="unit-text">MHz</span>
                  </el-form-item></el-col
                >
                <el-col :span="8">
                  <el-form-item
                    label="超短波带宽"
                    :label-width="formLabelWidth"
                  >
                    <el-input-number
                      v-model="paramsForm.dkcdb1"
                      :min="3"
                      :max="300"
                      controls-position="right"
                    /><span class="unit-text">KHz</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出联方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.clfscdb"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                    >
                      <el-option label="定频" value="定频" />
                      <el-option label="跳频" value="跳频" />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"
                  ><el-form-item label="调制方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.tzfscdb"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                    >
                      <el-option label="AM" value="AM" />
                      <el-option label="FM" value="FM" />
                      <el-option label="2FSK" value="2FSK" />
                      <el-option label="MSK" value="MSK" />
                      <el-option label="BPSK" value="BPSK" />
                      <el-option label="QPSK" value="QPSK" />
                      <el-option label="BPSK" value="BPSK" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="8"
                  ><el-form-item label="调制速率" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="paramsForm.tzslcdb"
                      :min="1000"
                      :max="9999999999"
                      controls-position="right"
                    /><span class="unit-text">KHz</span>
                  </el-form-item></el-col
                >
                <el-col :span="8"
                  ><el-form-item label="采样率" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="paramsForm.cylcdb"
                      :min="1000"
                      :max="9999999999"
                      controls-position="right"
                    />
                    <span class="unit-text">KHz</span></el-form-item
                  ></el-col
                >
              </el-row>
            </el-form>
            <el-form v-if="wbActive" class="area">
              <div class="textOne">微波</div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="微波频率" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="paramsForm.gzplwb2"
                      :min="1000"
                      :max="3000"
                      controls-position="right"
                    />
                    <span class="unit-text">MHz</span></el-form-item
                  ></el-col
                >
                <el-col :span="8">
                  <el-form-item label="微波带宽" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="paramsForm.dkwb2"
                      :min="1"
                      :max="10"
                      controls-position="right"
                    /><span class="unit-text">KHz</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出联方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.clfswb"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                    >
                      <el-option label="定频" value="定频" />
                      <el-option label="跳频" value="跳频" />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"
                  ><el-form-item label="调制方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="paramsForm.tzfswb"
                      placeholder="Please select a zone"
                      style="--el-text-color-regular: black"
                    >
                      <el-option label="AM" value="AM" />
                      <el-option label="FM" value="FM" />
                      <el-option label="2FSK" value="2FSK" />
                      <el-option label="MSK" value="MSK" />
                      <el-option label="BPSK" value="BPSK" />
                      <el-option label="QPSK" value="QPSK" />
                      <el-option label="BPSK" value="BPSK" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="8"
                  ><el-form-item label="调制速率" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="paramsForm.tzslwb"
                      :min="1000"
                      :max="9999999999"
                      controls-position="right"
                    />
                    <span class="unit-text">KHz</span></el-form-item
                  ></el-col
                >
                <el-col :span="8"
                  ><el-form-item label="采样率" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="paramsForm.cylwb"
                      :min="1000"
                      :max="9999999999"
                      controls-position="right"
                    /><span class="unit-text">KHz</span>
                  </el-form-item></el-col
                >
              </el-row>
            </el-form>

            <!-- <template #footer>
              <div class="dialog-footer">
                <el-button size="small" @click="dialogFormVisible = false"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  size="small"
                  @click="dialogFormVisible = false"
                >
                  保存
                </el-button>
              </div>
            </template> -->
          </el-dialog>
        </el-row>
      </el-form>
    </template>
    <template #footer>
      <div class="foot-btns">
        <el-button
          type="primary"
          color="transparent"
          size="small"
          @click="closePopup"
          >取消</el-button
        >
        <el-button type="primary" color="#119aa0" size="small" @click="onSave"
          >保存</el-button
        >
      </div>
    </template>
  </base-docker>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
import { usePopupStore } from '@/stores/popupStore'
import { useCesiumStore } from '@/stores/cesiumStore'
import { useEntityStore } from '@/stores/entityStore'
import { useToolTipStore } from '@/stores/tooltipStore'
import { useLinkStore } from '@/stores/linkStore'
import { onMounted } from 'vue'
import {
  IOpenAddEntityPopProps,
  IOpenEditEntityPopProps
} from '@/common/interface/popup'
import { getEntityImgByType } from '@/common/helper'
const props = withDefaults(
  defineProps<{
    title?: string
    data: IOpenAddEntityPopProps | IOpenEditEntityPopProps
  }>(),
  { title: '' }
)
import { reactive, ref, computed } from 'vue'
import MarkerLine from '@/common/class/markerLine'
import type { FormInstance } from 'element-plus'
import { EntityType } from '@/common/enum'
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '123') {
    callback(new Error('名称已存在!'))
  } else {
    callback()
  }
}
const dialogFormVisible = ref(false)
const formLabelWidth = '150px'
const paramsForm = ref({
  //综合链
  db: 10,
  cdb: 300,
  clfs: '定频',
  tzfs: '8PSK',
  cssldp: 1120,
  cssltp: 500,
  csslcdb: 12667,
  gzms: 'TDMA-时分多址',
  xxgs: '8PSK',
  //90X链
  db1: 15,
  cdb1: 300,
  clfs1: '定频',
  tzfs1db: 'SSB-Π/4DQPSK',
  tzfs1cdb: 'FM-8PSK',
  cssldp1: 1200,
  csslcdb1: 2250,
  gzms1: '点名轮询呼叫',
  xxgs1: 'M系列',
  //JIDS链
  cdb2: 960,
  clfs2: '定频',
  tzfs2: 'MSK',
  cssl2: 28800,
  gzms2: 'TDMA-时分多址',
  xxgs2: 'J序列',
  //卫星通信
  wxbh: '1',
  clfs3: '定频',
  gzpl: 1000,
  jhfs: 'H',
  sxx: 'U-上行',
  tzfs3: '2FSK',
  cyl: 1000,
  tzsl: 1000,
  //短波
  gzpldb: 1.5,
  gzplcdb: 30,
  gzplwb: 1000,
  clfsdb: '定频',
  dkdb: 2.4,
  dkcdb: 3,
  dkwb: 1,
  tzfsdb: 'AM',
  tzsldb: 1000,
  cyldb: 1000,
  //超短波
  gzpldb1: 1.5,
  gzplcdb1: 30,
  gzplwb1: 1000,
  clfscdb: '定频',
  dkdb1: 2.4,
  dkcdb1: 3,
  dkwb1: 1,
  tzfscdb: 'AM',
  tzslcdb: 1000,
  cylcdb: 1000,
  //微波
  gzpldb2: 1.5,
  gzplcdb2: 30,
  gzplwb2: 1000,
  clfswb: '定频',
  dkdb2: 2.4,
  dkcdb2: 3,
  dkwb2: 1,
  tzfswb: 'AM',
  tzslwb: 1000,
  cylwb: 1000
})
const formRef = ref<FormInstance>()
const formData = reactive({
  type: '' as EntityType,
  fakeType: '',
  name: '',
  position: [],
  path: [],
  equipment: [
    { name: '短波电台', isHas: false, isUse: false },
    { name: '对空超短波电台', isHas: false, isUse: false },
    { name: '对海超短波电台', isHas: false, isUse: false },
    { name: '微波电台', isHas: false, isUse: false },
    { name: '卫星通信设备', isHas: false, isUse: false },
    { name: '综合链设备', isHas: false, isUse: false },
    { name: '90X链设备', isHas: false, isUse: false },
    { name: 'JIDS链设备', isHas: false, isUse: false }
  ]
})
const zhlActive = computed(() => {
  const e = formData.equipment.find((_) => _.name === '综合链设备')
  return e.isHas
})
const xActive = computed(() => {
  const e = formData.equipment.find((_) => _.name === '90X链设备')
  return e.isHas
})
const jidsActive = computed(() => {
  const e = formData.equipment.find((_) => _.name === 'JIDS链设备')
  return e.isHas
})
const kuActive = computed(() => {
  const e = formData.equipment.find((_) => _.name === '卫星通信设备')
  if (e) {
    return e.isHas
  } else {
    return false
  }
})
const dbActive = computed(() => {
  const e = formData.equipment.find((_) => _.name === '短波电台')
  return e.isHas
})
const cdbActive = computed(() => {
  const e1 = formData.equipment.find((_) => _.name === '对空超短波电台')
  const e2 = formData.equipment.find((_) => _.name === '对海超短波电台')
  return e1.isHas || e2.isHas
})
const wbActive = computed(() => {
  const e = formData.equipment.find((_) => _.name === '微波电台')
  return e.isHas
})
const isPickPointStatus = ref(false) //是否开启地图选点状态
const isPickPathStatus = ref(false) //是否开启地图选路径状态
const trackPointArr = computed(() => {
  return formData.path
    .map((_) => {
      return _.pos
    })
    .flat()
})
const popupStore = usePopupStore()
const cesiumStore = useCesiumStore()
const entityStore = useEntityStore()
const tooltipStore = useToolTipStore()
const linkStore = useLinkStore()
let trackLine: MarkerLine
const closePopup = () => {
  popupStore.closePop()
  cesiumStore.cesium.markMap.markPoint.remove(dyPoint)
  trackLine.destroy()
}
const onSave = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if ('name' in props.data) {
        //编辑
        entityStore.removeEntityById(props.data.name)
        cesiumStore.cesium.modelMap.removeModel({ id: props.data.name })
        cesiumStore.cesium.trackMap.removeTrack({ id: props.data.name })
        cesiumStore.cesium.boardMap.removeLabelById(props.data.name)
        cesiumStore.cesium.scanMap.removeScanById(props.data.name)
      } else {
        //新增
      }
      const opt = {
        id: formData.name,
        type: formData.type,
        position: formData.position,
        path: formData.path.map((_) => [_.pos[0], _.pos[1], 3000]),
        equipment: formData.equipment,
        params: paramsForm.value
      }
      entityStore.addEntity(opt)
      cesiumStore.cesium.modelMap.addModel({
        id: formData.name,
        position: formData.position,
        type: formData.type
      })
      cesiumStore.cesium.boardMap.addBoard({
        id: formData.name,
        position: formData.position
      })
      cesiumStore.cesium.trackMap.addTrack({
        id: formData.name,
        positionArr: formData.path.map((_) => [_.pos[0], _.pos[1], 3000])
      })
      let wt = formData.equipment.find((_) => _.name === '卫星通信设备')
      if (wt?.isHas && wt?.isUse) {
        cesiumStore.cesium.scanMap.addScan({
          id: formData.name,
          position: formData.position
        })
        linkStore.linkConnectInfo['KU卫通'].selection.push(formData.name)
      } else {
        cesiumStore.cesium.scanMap.removeScanById(formData.name)
        linkStore.linkConnectInfo['KU卫通'].selection =
          linkStore.linkConnectInfo['KU卫通'].selection.filter(
            (_) => _ !== formData.name
          )
      }
      let zhl = formData.equipment.find((_) => _.name === '综合链设备')
      if (zhl?.isHas && zhl?.isUse) {
        linkStore.linkConnectInfo['综合链'].selection.push(formData.name)
      } else {
        linkStore.linkConnectInfo['综合链'].selection =
          linkStore.linkConnectInfo['综合链'].selection.filter(
            (_) => _ !== formData.name
          )
      }
      let l90x = formData.equipment.find((_) => _.name === '90X链设备')
      if (l90x?.isHas && l90x?.isUse) {
        linkStore.linkConnectInfo['90X链'].selection.push(formData.name)
      } else {
        linkStore.linkConnectInfo['90X链'].selection =
          linkStore.linkConnectInfo['90X链'].selection.filter(
            (_) => _ !== formData.name
          )
      }
      let jids = formData.equipment.find((_) => _.name === 'JIDS链设备')
      if (jids?.isHas && jids?.isUse) {
        linkStore.linkConnectInfo['JIDS链'].selection.push(formData.name)
      } else {
        linkStore.linkConnectInfo['JIDS链'].selection =
          linkStore.linkConnectInfo['JIDS链'].selection.filter(
            (_) => _ !== formData.name
          )
      }

      closePopup()
    }
  })
}
const showParamSet = () => {
  dialogFormVisible.value = true
}

const editPath = () => {
  if (isPickPointStatus.value) return
  isPickPathStatus.value = true
  tooltipStore.showTooltip({ text: '单击标绘，右击结束' })
  cesiumStore.cesium.eventHandler.register({
    type: 'LeftClick',
    id: 'pickEditPathPoint',
    callBack: (e) => {
      formData.path.push({
        index: 0,
        pos: [e.position[0], e.position[1]]
      })
      trackLine.updateLinePosition(
        formData.path
          .map((_) => {
            return _.pos
          })
          .flat() as any
      )
      //取出path绘制线
      //cesiumStore.cesium.markMap.markTools.addLine()
    }
  })

  cesiumStore.cesium.eventHandler.register({
    type: 'MouseMove',
    id: 'getDynamicPoint',
    callBack: (e) => {
      trackLine.updatePointerPosition([e.position[0], e.position[1]] as any)
    }
  })
  cesiumStore.cesium.eventHandler.register({
    type: 'RightClick',
    id: 'endEditPath',
    callBack: (e) => {
      formData.path.push({
        index: 0,
        pos: [e.position[0], e.position[1]]
      })
      trackLine.updateLinePosition(
        formData.path
          .map((_) => {
            return _.pos
          })
          .flat() as any
      )
      cesiumStore.cesium.eventHandler.remove({
        type: 'LeftClick',
        id: 'pickEditPathPoint'
      })
      cesiumStore.cesium.eventHandler.remove({
        type: 'MouseMove',
        id: 'getDynamicPoint'
      })
      cesiumStore.cesium.eventHandler.remove({
        type: 'RightClick',
        id: 'endEditPath'
      })
      isPickPathStatus.value = false
      tooltipStore.closeToolTip()
    }
  })
}
const resetPath = () => {
  formData.path.splice(1)
  trackLine.updateLinePosition(
    formData.path
      .map((_) => {
        return _.pos
      })
      .flat() as any
  )
}
let dyPoint: any
const pickPoint = () => {
  if (isPickPathStatus.value) return
  isPickPointStatus.value = true
  tooltipStore.showTooltip({ text: '单击地球，选取点位' })
  cesiumStore.cesium.eventHandler.register({
    type: 'LeftClick',
    id: 'pickEntityPoint',
    callBack: (e) => {
      formData.position = [e.position[0], e.position[1], 3000]
      cesiumStore.cesium.markMap.markPoint.updatePosition({
        item: dyPoint,
        position: [e.position[0], e.position[1]]
      })
      formData.path[0] = { index: 0, pos: [e.position[0], e.position[1]] }
      trackLine.updateLinePosition(
        formData.path
          .map((_) => {
            return _.pos
          })
          .flat() as any
      )
      cesiumStore.cesium.eventHandler.remove({
        type: 'LeftClick',
        id: 'pickEntityPoint'
      })
      isPickPointStatus.value = false
      tooltipStore.closeToolTip()
    }
  })
}
const getFakeTypeFromType = (type: EntityType) => {
  let result = ''
  switch (type) {
    case '武装直升机':
      result = 'h-6k轰炸机'
      break
    case '侦察直升机':
      result = '预警直升机'
      break

    case '中国052C型驱逐舰':
      result = '中国052C型驱逐舰'
      break

    case '中国052D型驱逐舰':
      result = '中国052D型驱逐舰'
      break
  }
  return result
}
onMounted(() => {
  formData.type = props.data.type
  formData.fakeType = getFakeTypeFromType(props.data.type)
  formData.position = [
    Number(props.data.position[0].toFixed(3)),
    Number(props.data.position[1].toFixed(3)),
    3000
  ]
  if ('name' in props.data) {
    //编辑
    //IOpenEditEntityPopProps
    formData.name = props.data.name
    formData.equipment = JSON.parse(JSON.stringify(props.data.equipment))
    // formData.path = props.data.path
    props.data.path.forEach((_) => {
      formData.path.push({
        index: 0,
        pos: [Number(_[0].toFixed(3)), Number(_[1].toFixed(3))]
      })
    })
    if (entityStore.getEntityById(props.data.name).params) {
      paramsForm.value = entityStore.getEntityById(props.data.name).params
    }
  } else {
    //新增
    formData.path.push({
      index: 0,
      pos: [
        Number(props.data.position[0].toFixed(3)),
        Number(props.data.position[1].toFixed(3))
      ]
    })
  }
  if (['武装直升机', '侦察直升机'].includes(props.data.type)) {
    formData.equipment = formData.equipment.filter(
      (_) => _.name !== '卫星通信设备'
    )
  }
  dyPoint = cesiumStore.cesium.markMap.markPoint.addItem({
    position: [props.data.position[0], props.data.position[1]]
  })
  trackLine = new MarkerLine(
    cesiumStore.cesium.viewer,
    trackPointArr.value as any
  )
})
</script>

<style scoped>
.unit-text {
  margin-left: 10px;
}
.foot-btns {
  display: flex;
  justify-content: flex-end;
}
.entity-form {
  padding: 15px;
  color: white;
  --el-text-color-regular: rgb(232, 232, 232);
}
.entity-form .el-input {
  /* --el-input-width: 110px; */
  --el-input-bg-color: #0c1a39;
  --el-disabled-bg-color: #0c1a39;
  --el-input-hover-border-color: #16b0b8;
  --el-input-border-color: #0e9aa0;
  --el-disabled-border-color: #0d6e71;
  --el-fill-color-light: transparent;
  --el-color-info: white;
}
:deep(.el-table .cell) {
  overflow: visible;
}
:deep(.el-dialog .el-input__inner) {
  color: black;
}
:deep(.el-dialog .el-dialog__title) {
  color: white;
}
:deep(.el-dialog .el-input__wrapper) {
  background-color: white;
}
:deep(.el-dialog .el-select) {
  width: 150px;
}
.mark-point-active {
  position: relative;
}
.card-active {
  border-color: rgb(0, 128, 255);
  position: relative;
}
.mark-point-active::before,
.mark-point-active::after {
  content: '';
  position: absolute;
  top: -7px;
  left: -7px;
  right: -7px;
  bottom: -7px;
  border: 2px solid #00f3fe;
  transition: all 0.5s;
  animation: clippath 3s infinite linear;
  border-radius: 7px;
}

.mark-point-active:after {
  animation: clippath 3s infinite -1.5s linear;
}
@keyframes clippath {
  0%,
  100% {
    clip-path: inset(0 0 80% 0);
  }

  25% {
    clip-path: inset(0 80% 0 0);
  }
  50% {
    clip-path: inset(80% 0 0 0);
  }
  75% {
    clip-path: inset(0 0 0 80%);
  }
}
.entity-form .el-input .el-button {
  display: flex;
}
.entity-form .el-input-group__append .el-input-group__prepend {
  background-color: red;
}

.entity-form .el-select {
  --el-select-width: 110px;
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
.area {
  border: 2px solid white;
  border-radius: 5px;
  margin-top: 10px;
}
.textOne {
  width: 50px;
  transform: translateY(-8px) translateX(10px);
  background-color: #2b6c7c;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}
</style>
