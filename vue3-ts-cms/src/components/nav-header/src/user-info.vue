<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="40" :src="avatar" />
        <span class="user-name"> {{ name }} </span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="SwitchButton">退出登录</el-dropdown-item>
          <el-dropdown-item divided> 用户信息 </el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { computed, ref } from 'vue'
const store = useStore()
const name = computed(() => store.state.login.userInfo.name)
const avatar = ref(
  'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
)
</script>
<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  font-size: 30px;
  align-items: center;
  cursor: pointer;
  .user-name {
    margin-left: 5px;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
