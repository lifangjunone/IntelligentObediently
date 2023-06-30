<template>
  <div class="nav-header">
    <i class="iconfont fold-menu" @click="handleFoldClick">&#xe62c;</i>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['changeFold'])
const isFold = ref(false)
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('changeFold', isFold.value)
}
</script>

<style scoped lang="less">
.nav-header {
  .fold-menu {
    font-size: 46px;
  }
}
</style>
