<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="`新建${contentTableConfig.title}`"
      width="30%"
      center
      destroy-on-close
    >
      <fj-form v-bind="modalConfig" v-model="formData"></fj-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleCommitClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import FjForm from '@/base-ui/form'
import { useStore } from 'vuex'

const store = useStore()
const props = defineProps({
  contentTableConfig: {
    type: Object,
    default: () => ({})
  },
  requestInfo: {
    type: Object,
    required: true
  },
  sourceValue: {
    type: Object,
    default: () => ({})
  },
  modalConfig: {
    type: Object,
    default: () => ({})
  },
  formData: {
    type: Object,
    default: () => ({})
  }
})
const dialogVisible = ref(false)
const formData = ref<any>({})
watch(
  () => props.sourceValue,
  // props.sourceValue,
  (newValue) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  },
  {
    deep: true
  }
)
const handleCommitClick = () => {
  dialogVisible.value = false
  if (Object.keys(props.sourceValue).length === 0) {
    // 新建请求
    store.dispatch('system/createPageDataAction', {
      payload: formData.value,
      requestInfo: props.requestInfo
    })
  } else {
    // 编辑请求
    store.dispatch('system/editPageDataAction', {
      payload: formData.value,
      requestInfo: props.requestInfo,
      id: props.sourceValue.id
    })
  }
}
defineExpose({
  dialogVisible
})
</script>

<style scoped></style>
