export const rules = {
  phoneNumber: [
    {
      required: true,
      message: '手机号必传',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{11,11}$/,
      message: '无效的手机号~',
      trigger: 'blur'
    }
  ],
  verifyCode: [
    {
      required: true,
      message: '验证码必传',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-a-z0-9]{4,6}$/,
      message: '请输入４~6六位验证码s',
      trigger: 'blur'
    }
  ]
}
