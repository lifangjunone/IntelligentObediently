import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch(requestInfo: any) {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetClick = () => {
    pageContentRef.value?.getPageData(requestInfo)
  }
  const handleSearchClick = (queryInfo: any) => {
    const queryParams = { ...requestInfo.queryInfo, ...queryInfo }

    requestInfo.queryInfo = queryParams
    pageContentRef.value?.getPageData(requestInfo)
  }
  return [pageContentRef, handleResetClick, handleSearchClick]
}
