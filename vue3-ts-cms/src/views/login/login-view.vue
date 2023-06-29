<!-- eslint-disable vue/no-unused-components -->
<template>
  <div class="login">
    <loginPanel />
  </div>
</template>

<script lang="ts" setup>
import loginPanel from './cpns/login-panel.vue'
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: url('../../assets/img/bg02.png') no-repeat;
  background-size: cover;
}
</style>
