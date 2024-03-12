<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { Right } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const router = useRouter()
const loginFormRef = ref<FormInstance>()
const formData = reactive({
  username: 'admin',
  password: '123456'
})
const isloading = ref(false)
const validateUser = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('用户名不可为空'))
  } else {
    callback()
  }
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('密码不可为空'))
  } else {
    callback()
  }
}
const login = async () => {
  await loginFormRef.value.validate((valid) => {
    if (valid) {
      isloading.value = true
      setTimeout(() => {
        isloading.value = false
        if (formData.username === 'admin' && formData.password === '123456') {
          router.replace({
            path: `/dataLink/thought/overview`
          })
        } else {
          ElMessage.error('用户名或密码错误')
        }
      }, 500)
    }
  })
}
</script>
<template>
  <div class="login-container">
    <div class="login-content">
      <div class="content-left">
        <span>数</span>
        <span>据</span>
        <span>链</span>
        <span>模</span>
        <span>拟</span>
        <span>套</span>
        <span>件</span>
      </div>
      <div class="content-right">
        <el-form
          ref="loginFormRef"
          :model="formData"
          style="--el-text-color-regular: #aab6ce"
          label-width="auto"
          label-position="left"
        >
          <el-form-item>
            <el-avatar
              :size="50"
              style="margin: 0 auto; --el-text-color-disabled: #119aa0"
            >
              <el-icon :size="20"><i-ep-User /></el-icon>
            </el-avatar>
          </el-form-item>
          <el-form-item
            label="用户名:"
            :rules="[
              {
                validator: validateUser,
                trigger: 'change'
              }
            ]"
            prop="username"
          >
            <el-input
              v-model="formData.username"
              style="width: 200px"
              clearable
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item
            label="密码:"
            :rules="[
              {
                validator: validatePassword,
                trigger: 'change'
              }
            ]"
            prop="password"
          >
            <el-input
              v-model="formData.password"
              style="width: 200px"
              type="password"
              show-password
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item label="">
            <el-button
              size="small"
              style="width: 100%; height: 35px"
              type="primary"
              color="#119aa0"
              round
              :loading="isloading"
              :icon="Right"
              @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.login-content {
  height: 350px;
  width: 600px;
  position: fixed;
  position: relative;
  border: 2px solid #119aa0;
  border-radius: 6px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-image: url('../../../assets//login.jpg');
  background-repeat: no-repeat;
  background-position: 0% 100%;
  background-size: 50% 100%;
  display: flex;
}
.content-left {
  width: 50%;
  font-size: 27px;
  color: white;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 28px;
  border-radius: 6px;
  user-select: none;
}
.content-left span {
  animation-delay: 0s;
  color: #fdfdfd;
  text-shadow: 0 0 0 #444;
  animation: start 3s ease-in-out infinite alternate;
}
.content-left span:nth-child(1) {
  animation-delay: 0.6s;
}

.content-left span:nth-child(2) {
  animation-delay: 1.2s;
}

.content-left span:nth-child(3) {
  animation-delay: 1.8s;
}

.content-left span:nth-child(4) {
  animation-delay: 2.4s;
}

.content-left span:nth-child(5) {
  animation-delay: 3s;
}

.content-left span:nth-child(6) {
  animation-delay: 3.6s;
}

.content-left span:nth-child(7) {
  animation-delay: 4.2s;
}
@keyframes start {
  to {
    text-shadow:
      0 0 5px #fff,
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 18px #126fcc,
      0 0 20px #126fcc,
      0 0 40px #126fcc;
    color: #fff;
  }
}

.content-right {
  border-radius: 0 6px 6px 0;
  position: absolute;
  right: 0;
  width: 50%;
  height: 100%;
  padding: 20px;
  padding-top: 60px;
  box-sizing: border-box;
  background-color: #0b1a39;
}
.el-form-item {
  margin-bottom: 20px;
}
.content-right .el-input {
  /* --el-input-width: 110px; */
  --el-input-bg-color: #0c1a39;
  --el-disabled-bg-color: #0c1a39;
  --el-input-hover-border-color: #16b0b8;
  --el-input-border-color: #0e9aa0;
  --el-disabled-border-color: #0d6e71;
  --el-fill-color-light: transparent;
  --el-color-info: white;
  --el-input-text-color: white;
}
::v-deep(.el-button--small) {
  font-size: 14px;
}
</style>
