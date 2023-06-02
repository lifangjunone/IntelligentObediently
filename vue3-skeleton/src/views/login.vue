<template>
  <div class="loginDiv">
    <div class="mainDiv">
      <div class="medical-login-left">
        <span class="title">iDL智能管理</span>
        <img :src="myRequire('login-bg')" />
      </div>
      <div class="medical-login-right" key="form">
        <div class="medical-login_box">
          <!--登录 start-->
          <div class="medical-login_form">
            <div class="loginNav">
              <span>账号密码登录</span>
            </div>
            <el-form ref="ruleFormRef" :model="loginForm" :rules="rules" label-width="0px" class="userinfo" @submit.prevent>
              <el-form-item prop="username" class="phoneInput">
                <el-input v-model="loginForm.username" placeholder="账户ID"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" :type="showEye ? 'password' : 'text'" placeholder="密码" @keyup.enter="submitForm(ruleFormRef)"></el-input>
                <i :class="showEye ? 'iconfont icon-yanjing' : 'iconfont icon-yanjing1'" @click="showEye = !showEye"></i>
              </el-form-item>
            </el-form>
            <div class="btn-login" :class="loginForm.username !== '' && loginForm.password !== '' ? 'active' : ''" @click="submitForm(ruleFormRef)">登 录</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { login } from '@/api/api_user'
// import { useIndexStore } from '@/store'
import router from '@/router'
// 自定义require方法
const myRequire = (name) => new URL(`/src/assets/${name}.svg`, import.meta.url).href
const loginForm = reactive({
  username: 'admin',
  password: '123'
})
const showEye = ref(false)
const ruleFormRef = ref()
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const clearLocalStprage = () => {
  localStorage.clear()
}
// 清空localStorage
clearLocalStprage()
const submitForm = async(formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const params = {
        password: loginForm.password,
        username: loginForm.username
      }
      login(params).then((res) => {
        if (res.code === 200) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user_id', JSON.stringify(res.data.user.ID))
          localStorage.setItem('username', loginForm.username)
          localStorage.setItem('minioIP', 'http://10.31.0.130:9000')
          router.push({ name: 'home' })
        }
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style scoped lang="scss">
.flexCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginDiv {
  width: 100%;
  height: 100%;

  .mainDiv {
    width: 100%;
    height: 100%;
    display: flex;

    .medical-login-left {
      width: 50%;
      height: 100%;
      background: rgba(55, 138, 255, 0.05);
      @extend .flexCenter;
      position: relative;

      .title {
        position: absolute;
        top: 33px;
        left: 32px;
        font-size: 32px;
        font-weight: 600;
        color: #262626;
      }
    }

    .medical-login-right {
      width: 50%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: space-around;
      align-items: center;

      .el-input--medium .el-input__icon {
        color: #000000 !important;
      }

      .medical-login_box {
        width: 368px;
        padding: 40px;
        box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.2);
        .medical-login_form {
          .loginNav {
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            margin-bottom: 50px;

            span {
              font-size: 24px;
              font-weight: 600;
              color: #262626;
              cursor: pointer;
            }
          }

          .userinfo {
            width: 100%;

            .el-form-item {
              margin-bottom: 0;
            }

            .phoneInput {
              margin-bottom: 32px;

              .verify {
                background: #91b9cd;
                color: #ffffff;
              }
            }

            :deep(.el-form-item) {
              background-color: #f7f7f7;
              border-radius: 100%;
            }

            :deep(.el-input__inner) {
              height: 40px;
              line-height: 40px;
              color: #000 !important;
              // border-radius: 4px;
            }
          }

          .btn-login {
            height: 40px;
            line-height: 40px;
            background-color: #3b53af;
            color: #fff;
            font-size: 16px;
            font-weight: 500;
            margin: 24px 0;
            text-align: center;
            opacity: 0.3;
            cursor: pointer;

            &.active {
              opacity: 1;
            }
          }

          :deep(.el-input--medium .el-input__inner) {
            font-size: 14px;
          }

          .el-checkbox {
            color: #fff;
          }
        }
      }

      :deep(.el-input--medium .el-input__icon) {
        color: #c5cae2;
      }
    }
  }
}
</style>
