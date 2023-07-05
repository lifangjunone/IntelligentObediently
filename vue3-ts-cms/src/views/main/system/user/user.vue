<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @searchClick="handleSearchClick"
      @resetClick="handleResetClick"
    />
    <page-content
      :contentTableConfig="contentTableConfig"
      :requestInfo="requestInfo"
      ref="pageContentRef"
    ></page-content>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { requestInfo } from './config/request.config'
import { usePageSearch } from '@/hooks/use-page-search'
const [pageContentRef, handleResetClick, handleSearchClick] =
  usePageSearch(requestInfo)
</script>

<style scoped lang="less"></style>
