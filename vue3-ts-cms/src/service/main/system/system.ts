import fjRequest from '@/service'
import { IDataType } from '@/service/type'

export function getPageListData(url: string, queryInfo: any) {
  return fjRequest.get<IDataType>({
    url: url,
    data: queryInfo,
    params: queryInfo
  })
}
