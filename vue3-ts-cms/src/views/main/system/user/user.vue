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
      @clickCreate="handleCreateClick"
    ></page-content>
    <page-modal
      :modalConfig="modalConfig"
      :contentTableConfig="contentTableConfig"
      ref="pageModalRef"
    ></page-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { requestInfo } from './config/request.config'
import { usePageSearch } from '@/hooks/use-page-search'
import PageModal from '@/components/page-modal'
const [pageContentRef, handleResetClick, handleSearchClick] =
  usePageSearch(requestInfo)
const pageModalRef = ref<InstanceType<typeof PageModal>>()
const handleCreateClick = () => {
  pageModalRef.value.dialogVisible = true
}
</script>

<style scoped lang="less"></style>
