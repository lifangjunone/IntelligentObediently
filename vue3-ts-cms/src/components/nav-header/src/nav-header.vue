<template>
  <div class="nav-header">
    <i class="iconfont fold-menu" @click="handleFoldClick">&#xe62c;</i>
    <div class="content">
      <div>面包屑</div>
      <UserInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineEmits } from 'vue'
import UserInfo from './user-info.vue'

const emit = defineEmits(['changeFold'])
const isFold = ref(false)
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('changeFold', isFold.value)
}
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  .fold-menu {
    font-size: 46px;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
