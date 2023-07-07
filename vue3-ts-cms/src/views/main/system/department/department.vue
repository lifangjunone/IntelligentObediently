<template>
  <div>
    <page-content
      :requestInfo="requestInfo"
      :contentTableConfig="contentTableConfig"
    ></page-content>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
import { requestInfo } from './config/request.config'
</script>

<style scoped></style>
