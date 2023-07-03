import fjRequest from '@/service'
import { IDataType } from '@/service/type'

export function getPageListData(url: string, queryIfo: any) {
  return fjRequest.get<IDataType>({
    url: url,
    data: queryIfo
  })
}
