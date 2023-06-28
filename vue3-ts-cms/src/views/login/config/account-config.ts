export const rules = {
  name: [
    {
      required: true,
      message: '用户名必传',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,16}$/,
      message: '用户名必须是5~16个字符~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码比传',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-a-z0-9]{6,}$/,
      message: '密码不能少于六位',
      trigger: 'blur'
    }
  ]
}
