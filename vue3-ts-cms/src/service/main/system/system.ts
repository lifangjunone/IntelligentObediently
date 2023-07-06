import fjRequest from '@/service'
import { IDataType } from '@/service/type'

export function getPageListData(url: string, queryInfo: any) {
  return fjRequest.get<IDataType>({
    url: url,
    data: queryInfo,
    params: queryInfo
  })
}

export function deletePageData(url: string) {
  return fjRequest.delete<IDataType>({
    url: url
  })
}
