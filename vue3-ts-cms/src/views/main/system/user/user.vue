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
      :modalConfig="modalConfigComputed"
      :contentTableConfig="contentTableConfig"
      ref="pageModalRef"
      :sourceValue="sourceValue"
      :requestInfo="requestInfo"
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
import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()
const [pageContentRef, handleResetClick, handleSearchClick] =
  usePageSearch(requestInfo)
// 父组件响应式变量传递给子组件时，当子组件也将此值设置为响应式时，父组件数据的变化会直接传递给子组件对应的值，反之则不行
// 有个bug卡了我好久，由于modalConfig传递给子组件时没有进行响应式绑定，因此在user组件修改
// modalConfig 的值时，并不会影响子组件中的值，所以需要当 el-dialog 关闭时销毁此组件，即加destroy-on-close
// 属性即可，这样每次新建，编辑取得值就是正确的
// 新建，编辑回调函数
const createCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  // passwordItem!: 非空断言
  passwordItem!.isHidden = false
  console.log('创建回调了', passwordItem?.isHidden)
}
const editCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  passwordItem!.isHidden = true
  console.log('编辑回调了', passwordItem?.isHidden)
}
const modalConfigComputed = computed(() => {
  // 动态添加部门和角色列表
  const departmentItem = modalConfig.formItems.find(
    (item) => item.field === 'departmentId'
  )
  departmentItem!.options = store.state.entiresDepartment.map((item) => {
    return { title: item.name, value: item.id }
  })
  const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')
  roleItem!.options = store.state.entiresRole.map((item) => {
    return { title: item.name, value: item.id }
  })
  return modalConfig
})
// 调用hook获取公共变量和函数
const [pageModalRef, sourceValue, handleEditClick, handleCreateClick] =
  usePageModal(createCallback, editCallback)
</script>

<style scoped lang="less"></style>
