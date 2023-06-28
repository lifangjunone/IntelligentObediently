<!-- eslint-disable vue/no-unused-components -->
<template>
  <div class="login">
    <loginPanel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import loginPanel from './cpns/login-panel.vue'

export default defineComponent({
  components: {
    loginPanel
  },
  setup() {
    return {}
  }
})
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
