<template>
  <div class="page-content">
    <fj-table
      :dataList="dataList"
      v-bind="contentTableConfig"
      @selectionChange="selectComChange"
    >
      <template #headerHandler>
        <el-button type="primary">新建用户</el-button>
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
          <el-button icon="Edit" size="small" type="text">编辑</el-button>
          <el-button icon="Delete" size="small" type="text">删除</el-button>
        </div>
      </template>
    </fj-table>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { computed } from 'vue'
import FjTable from '@/base-ui/table'
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
const selectComChange = (value: any) => {
  emit('selectChange', value)
}
const store = useStore()
store.dispatch('system/getPageListAction', {
  requestInfo: props.requestInfo
})
const dataList = computed(() =>
  store.getters[`system/pageListData`](props.requestInfo.pageName)
)
// const userCount = computed(() => store.state.system.userCount)
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
