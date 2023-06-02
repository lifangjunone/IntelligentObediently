<template>
  <div class="listDiv">
    <header class="header header1">
      <div class="search">
        <div class="searchTitle">用户名</div>
        <el-input
            v-model="keyword"
            class="w-50 m-2"
            size="large"
            placeholder="用户名"
            :prefix-icon="Search"
            clearable
          />
      </div>
      <div class="search">
        <el-button type="success" icon="search"  @click="getData()">查询</el-button>
        <el-button type="success" icon="refresh"  @click="resetParams()">重置</el-button>
      </div>
    </header>
    <div class="tableStyle borderDiv">
      <header class="header header2">
        <div class="divText">
          <el-button type="success" icon="plus" @click="addPerson()">新增用户</el-button>
        </div>
      </header>
      <el-table class="singleTable" :data="tableData">
        <el-table-column prop="username" label="用户名" min-width="100"></el-table-column>
        <el-table-column prop="phone" label="手机号" min-width="100"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="100"></el-table-column>
        <el-table-column prop="authorityId" label="角色" min-width="100"></el-table-column>
        <el-table-column align="left" label="启用" min-width="150">
          <template #default="scope">
            <el-switch
              v-model="scope.row.enable"
              inline-prompt
              :active-value="1"
              :inactive-value="2"
              @change="()=>{switchEnable(scope.row)}"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template #default="scope">
            <el-button type="primary" link icon="edit" @click="editItem(scope.row)">编辑</el-button>
            <el-popover v-model="scope.row.visible" placement="top" width="160">
              <p>确定要删除此群组吗</p>
              <div style="text-align: right; margin-top: 8px;">
                <el-button type="primary" link @click="scope.row.visible = false">取消</el-button>
                <el-button type="primary" @click="deleteRow(scope.row)">确定</el-button>
              </div>
              <template #reference>
                <el-button type="primary" link icon="delete">删除</el-button>
              </template>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="tabel_pagination">
        <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" v-model:current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[20, 50, 100]" :page-size="limit" :total="total"> </el-pagination>
      </div>
    </div>
    <newUser v-if="addDialogShow" v-model:addDialogShow="addDialogShow" :curEditRow="curEditRow" @handle-close="addDialogShow = false" @handle-submit="handleSubmit" @handle-edit="handleEdit" />
  </div>
</template>

<script>
export default {
  name: 'UserManage'
}
</script>
<script setup>
import { ref } from 'vue'
import { ElTable, ElMessage } from 'element-plus'
import { getUserList, editUser, deleteUser } from '@/api/api_user'
import newUser from '@/components/manage/newUser.vue'

const tableData = ref([])

const addDialogShow = ref(false)
const currentPage = ref(1)
const limit = ref(20)
const total = ref(0)
const keyword = ref('')
const getData = async() => {
  const params = {
    page: currentPage.value,
    pageSize: limit.value,
    keyword: keyword.value
  }
  const res = await getUserList(params)
  if (res.code === 200) {
    tableData.value = res.data.list
    total.value = res.data.total
  } else {
    ElMessage.error(res.msg)
  }
}
// 加载时请求页面列表
getData()
// 重置
const resetParams = () => {
  keyword.value = ''
}
const curEditRow = ref('')
// 新增
const addPerson = () => {
  curEditRow.value = ''
  addDialogShow.value = true
}
// 编辑
const editItem = (row) => {
  curEditRow.value = row
  addDialogShow.value = true
}
// 删除
const deleteRow = async(row) => {
  const res = await deleteUser({ id: row.id })
  if (res.code === 200) {
    ElMessage.success('删除成功')
    row.visible = false
    await getData()
  }
}
// 新增后回调
const handleSubmit = async() => {
  await getData()
  addDialogShow.value = false
}
// 编辑成功后回调
const handleEdit = async() => {
  await getData()
  addDialogShow.value = false
}
// 分页导航
const handleCurrentChange = (val) => {
  currentPage.value = val
  getData()
}
const handleSizeChange = (val) => {
  currentPage.value = 1
  limit.value = val
  getData()
}
const switchEnable = async(row) => {
  const params = {
    id: row.id,
    username: row.username,
    phone: row.phone,
    email: row.email,
    enable: row.enable
  }
  const res = await editUser(params)
  if (res.code === 200) {
    ElMessage.success(`${row.enable === 2 ? '禁用' : '启用'}成功`)
  }
}
</script>

<style scoped lang="scss">
.listDiv {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px 0 0;
    box-sizing: border-box;
    background-color: #fff;

    &.header1 {
      height: 60px;
      font-size: 14px;
      padding-left: 20px;
      display: flex;
      justify-content: space-around;
      border-radius: 2px;
      background-color: #fff;
      .search{
        margin-right: 20px;
        display: flex;
        align-items: center;
        &:nth-child(1){
          flex: 1;
        }
        &:nth-child(2){
          flex: 3;
        }
        .searchTitle{
          width: 120px;
        }
      }
    }
    &.header2 {
      font-size: 14px;
      margin-bottom: 12px;
    }
    .divText {
      height: 100%;
      display: flex;
      align-items: center;
      color: #0b0b0a;
      font-weight: 500;
      font-size: 16px;
      span {
        border-right: 1px solid #d9d9d9;
        padding-right: 15px;
        margin-right: 15px;
        cursor: pointer;

        i {
          color: #378aff;
          font-weight: 600;
        }
      }
    }
  }

  .tableStyle {
    width: 100%;
    height: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 2px;
    padding: 24px 24px 0 24px;
    box-sizing: border-box;
    margin-top: 12px;
    :deep(.singleTable) {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .tabel_pagination {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
