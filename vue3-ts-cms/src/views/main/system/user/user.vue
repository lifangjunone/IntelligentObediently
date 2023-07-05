<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @searchClick="handleSearchClick"
    />
    <page-content
      :contentTableConfig="contentTableConfig"
      :requestInfo="requestInfo"
      ref="pageContentRef"
    ></page-content>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { requestInfo } from './config/request.config'
const pageContentRef = ref<InstanceType<typeof PageContent>>()
const handleSearchClick = (queryInfo: any) => {
  console.log('vvv', queryInfo)
  console.log('ccc', pageContentRef.value)
  const queryParams = { ...requestInfo.queryInfo, ...queryInfo }
  console.log('vvvvvvvvvvd', queryParams)

  requestInfo.queryInfo = queryParams
  pageContentRef.value?.getPageData(requestInfo)
}
</script>

<style scoped lang="less"></style>
