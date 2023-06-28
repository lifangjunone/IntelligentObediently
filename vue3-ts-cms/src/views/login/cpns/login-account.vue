<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" type="password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineExpose } from 'vue'
import { ElForm } from 'element-plus'

import { rules } from '../config/account-config'

const account = reactive({
  name: '',
  password: ''
})

const formRef = ref<InstanceType<typeof ElForm>>()
const loginAction = () => {
  console.log('子组件进行了打印')
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log('真正提交登录请求')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style scoped></style>
