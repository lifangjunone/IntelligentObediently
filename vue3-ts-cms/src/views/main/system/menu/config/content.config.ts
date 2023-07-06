export const contentTableConfig = {
  title: '菜单',
  showIndexColumn: false,
  showSelectColumn: false,
  showFooter: false,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: 100 },
    { prop: 'type', label: '类型', minWidth: 60 },
    { prop: 'url', label: '菜单URL', minWidth: 100 },
    { prop: 'icon', label: '菜单图标', minWidth: 100 },
    { prop: 'permission', label: '按钮权限', minWidth: 100 },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: 120,
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: 120,
      slotName: 'updateAt'
    },
    { prop: '操作', minWidth: 120, slotName: 'handle' }
  ]
}
