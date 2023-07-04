<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      :requestInfo="requestInfo"
    ></page-content>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { requestInfo } from './config/request.config'
</script>

<style scoped></style>
