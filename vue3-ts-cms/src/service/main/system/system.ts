import fjRequest from '@/service'
import { IDataType } from '@/service/type'

// 获取页面数据
export function getPageListData(url: string, queryInfo: any) {
  return fjRequest.get<IDataType>({
    url: url,
    data: queryInfo,
    params: queryInfo
  })
}

// 删除页面数据
export function deletePageData(url: string) {
  return fjRequest.delete<IDataType>({
    url: url
  })
}

// 创建页面数据
export function createPageData(url: string, data: any) {
  return fjRequest.post<IDataType>({ url, data })
}

// 编辑页面数据
export function editPageData(url: string, data: any) {
  return fjRequest.patch<IDataType>({ url, data })
}
