<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <div class="content"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'
const store = useStore()
store.dispatch('system/getPageListAction', {
  pageUrl: '/users',
  queryInfo: {
    offset: 0,
    size: 10
  }
})
const userList = computed(() => {
  return store.state.system.userList
})
const userCount = computed(() => store.state.system.userCount)
</script>

<style scoped lang="less"></style>
