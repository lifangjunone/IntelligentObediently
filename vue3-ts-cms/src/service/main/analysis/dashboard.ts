import fjRequest from '@/service'

enum DashboardAPI {
  categoryGoodsCount = 'shops/category/count',
  categoryGoodsSale = 'shops/category/sale',
  categoryGoodsFavor = 'shops/category/favor',
  addressGoodsSale = 'shops/address/sale'
}

export function getCategoryGoodsCount() {
  return fjRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}
export function getCategoryGoodsSale() {
  return fjRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}
export function getCategoryGoodsFavor() {
  return fjRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}
export function getAddressGoodsSale() {
  return fjRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}
