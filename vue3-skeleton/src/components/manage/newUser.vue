<template>
  <div class="addIP-dialogDIV">
    <el-dialog :title="title" v-model="showDialog" class="addIP_Dialog" width="800px" :before-close="handleClose">
      <el-form ref="ruleFormRef" label-width="103px" label-position="left" :model="formData" class="addIP_DialogForm" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input text class="study_DialogTitle_input" placeholder="请填写..." v-model="formData.username" @keyup.enter="submitForm(ruleFormRef)" @submit.prevent ref="username"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input text class="study_DialogTitle_input" placeholder="请填写..." v-model="formData.phone" @keyup.enter="submitForm(ruleFormRef)" @submit.prevent ref="phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input text class="study_DialogTitle_input" placeholder="请填写..." v-model="formData.email" @keyup.enter="submitForm(ruleFormRef)" @submit.prevent ref="email"></el-input>
        </el-form-item>
        <el-form-item label="启用">
          <el-switch
              v-model="formData.enable"
              inline-prompt
              :active-value="1"
              :inactive-value="2"
            />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)"> 确 定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'NewUser'
}
</script>
<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { createUser, editUser } from '@/api/api_user'

const props = defineProps({
  curEditRow: Object
})
const showDialog = ref(false)
const open = () => {
  showDialog.value = true
}
open()
const curEditRow = reactive(props.curEditRow)
const title = ref('新增用户')
const formData = reactive({
  username: '',
  id: '',
  phone: '',
  email: ''
})
console.log('curEditRow', curEditRow)
if (curEditRow) {
  formData.id = curEditRow.id
  formData.username = curEditRow.username
  formData.phone = curEditRow.phone
  formData.email = curEditRow.email
  formData.enable = curEditRow.enable
  if (formData.id) {
    title.value = '编辑用户'
  }
}

const emit = defineEmits(['handle-close', 'handle-edit', 'handle-submit'])
const ruleFormRef = ref()
const rules = reactive({
  username: [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
})

const submitForm = async(formEl) => {
  if (!formEl) return
  await formEl.validate(async(valid, fields) => {
    if (valid) {
      if (formData.id) {
        const params = {
          id: formData.id,
          username: formData.username,
          phone: formData.phone,
          email: formData.email,
          enable: formData.enable
        }
        const res = await editUser(params)
        if (res.code === 200) {
          ElMessage.success('修改成功')
          emit('handle-edit', res.data)
        }
      } else {
        const params = {
          username: formData.username,
          phone: formData.phone,
          email: formData.email,
          enable: formData.enable
        }
        const res = await createUser(params)
        if (res.code === 200) {
          ElMessage.success('新增成功')
          emit('handle-submit', formData)
        }
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
const handleClose = () => {
  showDialog.value = false
  emit('handle-close')
}
</script>
<style scoped lang="scss">
.addIP-dialogDIV {
  :deep(.addIP_Dialog) {
    .el-form.addIP_DialogForm {
      margin: 32px 70px;

      .el-form-item__label {
        padding-left: 20px;
        font-weight: 500;
      }
    }

    .el-dialog__title {
      font-size: 16px;
    }

    .el-dialog__close {
      color: #91b9cd;
    }

    .el-dialog__body {
      padding: 0px;
    }

    .dialog-footer {
      padding: 0px;

      .el-button:nth-child(2) {
        margin-left: 16px;
      }
    }
    .el-select {
      width: 100%;
    }
  }
}
</style>
