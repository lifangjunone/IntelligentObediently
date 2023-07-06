<template>
  <div class="page-content">
    <fj-table
      v-model:pageInfo="pageInfo"
      :dataList="dataList"
      :dataCount="dataCount"
      v-bind="contentTableConfig"
      @selectionChange="selectComChange"
    >
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary"
          >新建{{ contentTableConfig.title }}</el-button
        >
      </template>
      <template #status="scope">
        <el-button
          size="small"
          plain
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
        <!-- <strong>{{ scope.row.createAt }}</strong> -->
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
        <!-- <strong>{{ scope.row.createAt }}</strong> -->
      </template>
      <template #handle>
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            icon="Edit"
            size="small"
            type="primary"
            link
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            icon="Delete"
            size="small"
            type="primary"
            link
            >删除</el-button
          >
        </div>
      </template>
      <template
        v-for="item in dynamicSlotList"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </fj-table>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { computed, ref, watch } from 'vue'
import FjTable from '@/base-ui/table'
import { usePermission } from '@/hooks/use-permission'

const store = useStore()
const emit = defineEmits(['selectChange'])
const props = defineProps({
  contentTableConfig: {
    type: Object,
    required: true
  },
  requestInfo: {
    type: Object,
    required: true
  }
})
const pageInfo = ref(props.requestInfo?.pageInfo)
const selectComChange = (value: any) => {
  emit('selectChange', value)
}
// 获取操作的权限
const isCreate = usePermission(props.requestInfo?.pageName, 'create')
const isDelete = usePermission(props.requestInfo?.pageName, 'delete')
const isUpdate = usePermission(props.requestInfo?.pageName, 'update')
const isQuery = usePermission(props.requestInfo?.pageName, 'query')
watch(pageInfo, (newValue: any) => {
  props.requestInfo.pageInfo = newValue
  getPageData()
})
// 调用store中的方法发送请求获取数据
const getPageData = () => {
  if (!isQuery) return
  store.dispatch('system/getPageListAction', {
    requestInfo: props.requestInfo
  })
}
getPageData()
// 根据页面名动态从vuex中获取数据，并通过计算数据进行绑定
const dataList = computed(() =>
  store.getters[`system/pageListData`](props.requestInfo?.pageName)
)
const dataCount = computed(() =>
  store.getters[`system/pageCountData`](props.requestInfo?.pageName)
)
// 获取所有动态插槽
const dynamicSlotList = props.contentTableConfig?.propList.filter(
  (item: any) => {
    if (item.slotName === 'status') return false
    if (item.slotName === 'createAt') return false
    if (item.slotName === 'updateAt') return false
    if (item.slotName === 'handle') return false
    return true
  }
)
// 暴露本模块的方法
defineExpose({
  getPageData
})
</script>

<style scoped lang="less">
.page-content {
  padding: 8px 20px;
  border-top: 16px solid #f5f5f5;
}
</style>
