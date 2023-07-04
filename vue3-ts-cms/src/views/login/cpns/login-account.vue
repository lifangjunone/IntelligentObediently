<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'

import { rules } from '../config/account-config'
import localCache from '@/utils/cache'

const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

const store = useStore()
const formRef = ref<InstanceType<typeof ElForm>>()
const loginAction = (isKeepPassword: boolean) => {
  // console.log('子组件进行了打印')
  formRef.value?.validate((valid) => {
    if (valid) {
      // console.log('真正提交登录请求')
      if (isKeepPassword) {
        localCache.setCache('name', account.name)
        localCache.setCache('password', account.password)
      } else {
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }

      store.dispatch('login/accountLoginAction', { ...account })
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style scoped></style>
