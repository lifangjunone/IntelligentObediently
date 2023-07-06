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
      @clickEdit="handleEditClick"
    ></page-content>
    <page-modal
      :modalConfig="modalConfig"
      :contentTableConfig="contentTableConfig"
      ref="pageModalRef"
      :sourceValue="sourceValue"
    ></page-modal>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { requestInfo } from './config/request.config'
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import PageModal from '@/components/page-modal'

const [pageContentRef, handleResetClick, handleSearchClick] =
  usePageSearch(requestInfo)
// 父组件响应式变量传递给子组件时，当子组件也将此值设置为响应式时，父组件数据的变化会直接传递给子组件对应的值，反之则不行

// 新建，编辑回调函数
const createCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  passwordItem!.isHidden = false
}
const editCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  passwordItem!.isHidden = true
}
const [pageModalRef, sourceValue, handleEditClick, handleCreateClick] =
  usePageModal(createCallback, editCallback)
</script>

<style scoped lang="less"></style>
