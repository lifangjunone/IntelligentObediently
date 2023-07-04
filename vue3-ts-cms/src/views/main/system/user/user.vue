<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content
      :contentTableConfig="contentTableConfig"
      :requestInfo="requestInfo"
    ></page-content>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { requestInfo } from './config/request.config'
</script>

<style scoped lang="less"></style>
