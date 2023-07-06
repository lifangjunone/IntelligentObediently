import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = () => void

export function usePageModal(createCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const sourceValue = ref({})
  const handleCreateClick = () => {
    pageModalRef.value.dialogVisible = true
    sourceValue.value = {}
    createCb && createCb()
  }
  const handleEditClick = (item: any) => {
    sourceValue.value = { ...item }
    pageModalRef.value.dialogVisible = true
    editCb && editCb()
  }
  return [pageModalRef, sourceValue, handleEditClick, handleCreateClick]
}
