<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="rules" :model="phone">
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="phone.phoneNumber" />
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode">
        <div class="get-code">
          <el-input v-model="phone.verifyCode" class="verify-input" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { defineExpose } from 'vue'

import { rules } from '../config/phone-config'

const store = useStore()
const phone = reactive({
  phoneNumber: '',
  verifyCode: ''
})
const loginAction = (isKeepPassword: boolean) => {
  console.log('调用phone loginAction')
  store.dispatch('login/phoneLoginAction', { ...phone })
}

defineExpose({
  loginAction
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
  .verify-input {
    flex-grow: 2;
  }
  .get-btn {
    width: 80px;
    margin-left: 10px;
    flex-grow: 1;
  }
}
</style>
