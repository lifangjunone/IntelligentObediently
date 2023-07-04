<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <div class="content">
      <fj-table :dataList="userList" :propList="propList"></fj-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
import { searchFormConfig, propList } from './config/search.config'
import FjTable from '@/base-ui/table'
const store = useStore()
store.dispatch('system/getPageListAction', {
  pageUrl: '/users',
  queryInfo: {
    offset: 0,
    size: 10
  }
})
const userList = computed(() => store.state.system.userList)
const userCount = computed(() => store.state.system.userCount)
console.log('vvvv', userList)
console.log('xxxx', propList)
</script>

<style scoped lang="less">
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
