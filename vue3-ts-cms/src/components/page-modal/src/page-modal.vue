<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="`新建${contentTableConfig.title}`"
      width="30%"
      center
    >
      <fj-form v-bind="modalConfig" v-model="formData"></fj-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FjForm from '@/base-ui/form'
const props = defineProps({
  contentTableConfig: {
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

const formData = ref(props.formData)
defineExpose({
  dialogVisible
})
</script>

<style scoped></style>
