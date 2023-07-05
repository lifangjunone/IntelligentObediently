export const contentTableConfig = {
  title: '商品列表',
  showIndexColumn: true,
  showSelectColumn: true,
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '80' },
    { prop: 'oldPrice', label: '原价格', minWidth: '60' },
    { prop: 'newPrice', label: '现价格', minWidth: '60' },
    { prop: 'imageUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
    { prop: 'enable', label: '状态', minWidth: '80', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '130',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '130',
      slotName: 'updateAt'
    },
    { prop: 'handle', label: '操作', minWidth: '120', slotName: 'handle' }
  ]
}
