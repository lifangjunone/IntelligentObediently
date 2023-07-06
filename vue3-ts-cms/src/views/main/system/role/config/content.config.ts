export const contentTableConfig = {
  title: '角色',
  showIndexColumn: true,
  showSelectColumn: true,
  propList: [
    { prop: 'name', label: '角色名', minWidth: '100' },
    { prop: 'intro', label: '权限介绍', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '150',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '150',
      slotName: 'updateAt'
    },
    { prop: 'handle', label: '操作', minWidth: '120', slotName: 'handle' }
  ]
}
