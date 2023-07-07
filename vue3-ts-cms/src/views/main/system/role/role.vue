<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      :requestInfo="requestInfo"
      @clickCreate="handleCreateClick"
      @clickEdit="handleEditClick"
    ></page-content>
    <page-modal
      :requestInfo="requestInfo"
      :modalConfig="modalConfig"
      :sourceValue="sourceValue"
      :contentTableConfig="contentTableConfig"
      ref="pageModalRef"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          :props="treeProps"
          :data="menu"
          node-key="id"
          show-checkbox
          @check-change="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { requestInfo } from './config/request.config'
import { modalConfig } from './config/modal.config'
import { usePageModal } from '@/hooks/use-page-modal'
import { useStore } from '@/store'
import { computed, ref } from 'vue'
const store = useStore()
const menu = computed(() => store.state.entiresMenu)
const otherInfo = ref({})
// 调用hook获取公共变量和函数
const [pageModalRef, sourceValue, handleEditClick, handleCreateClick] =
  usePageModal()
const handleCheckChange = (data1: any, data2: any) => {
  console.log('data1', data1)
  console.log('data2', data2)
}
const treeProps = {
  label: 'name',
  children: 'children'
}
</script>

<style scoped lang="less">
.menu-tree {
  padding-left: 23px;
}
</style>
