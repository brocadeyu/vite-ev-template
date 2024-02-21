<template>
  <base-docker
    :title="title"
    :show-footer="true"
    :height="'330px'"
    :width="'450px'"
    :is-draggable="true"
  >
    <template #content>
      <el-form
        :inline="true"
        :model="formData"
        class="entity-form"
        :style="{
          // backgroundImage: 'url(' + data.modelInfo.img + ')',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat'
        }"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="实体类型">
              <el-input
                v-model="formData.user"
                disabled
                :placeholder="data.modelInfo.name"
                clearable
              /> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="实体名称">
              <el-input
                v-model="formData.user"
                placeholder="请输入名称"
                clearable
              /> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="航线">
              <el-input
                v-model="formData.user"
                placeholder="请输入名称"
                clearable
              /> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="装备配置">
              <el-input
                v-model="formData.user"
                placeholder="请输入名称"
                clearable
              /> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
    </template>
    <template #footer>
      <div class="foot-btns">
        <el-button type="primary" size="small" @click="closePopup"
          >取消</el-button
        >
        <el-button type="primary" size="small">确定</el-button>
      </div>
    </template>
  </base-docker>
</template>

<script setup lang="ts">
import BaseDocker from '../components/BaseDocker.vue'
import { usePopupStore } from '@/stores/popupStore'
import { onMounted } from 'vue'
import SHIP052D from '@/assets/model/052d.png'
const props = withDefaults(
  defineProps<{
    title?: string
    data: any
  }>(),
  { title: '' }
)
import { reactive } from 'vue'

const formData = reactive({
  user: '',
  region: '',
  date: ''
})
const popupStore = usePopupStore()
const closePopup = () => {
  popupStore.closePop()
}
onMounted(() => {
  console.log('daa', props.data)
})
</script>

<style scoped>
.foot-btns {
  display: flex;
  justify-content: flex-end;
}
.entity-form {
  padding: 15px;
  color: white;
}
.entity-form .el-input {
  --el-input-width: 110px;
  --el-input-bg-color: #0c1a39;
  --el-disabled-bg-color: #0c1a39;
  --el-input-hover-border-color: #16b0b8;
  --el-input-border-color: #0e9aa0;
  --el-disabled-border-color: #0d6e71;
}

.entity-form .el-select {
  --el-select-width: 110px;
}
</style>
