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
          <el-upload
          action="/fileUploadAndDownload/upload"
          :headers="{ 'Authorization': token }"
          :before-upload="checkFile"
          :show-file-list="false"
          class="uploadImg"
          multiple
          :limit="20"
          :on-exceed="handleExceed"
          :on-error="uploadError"
          :on-success="uploadSuccess"
          >
            <el-button type="success">普通上传</el-button>
          </el-upload>
        </div>
      </header>
      <el-table class="singleTable" :data="tableData">
        <el-table-column label="预览" min-width="100">
          <template #default="scope">
            <CustomPic pic-type="file" :pic-src="scope.row.url" />
          </template>
        </el-table-column>
        <el-table-column label="日期" min-width="100">
          <template #default="scope">
            <div class="td-overflowEllipsis">{{ formatDateT(scope.row.updatedAt) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="文件名" min-width="100"></el-table-column>
        <el-table-column prop="bucketName" label="存储桶" min-width="100"></el-table-column>
        <el-table-column prop="url" label="链接" min-width="100"></el-table-column>
        <el-table-column prop="tag" label="标签" min-width="50"></el-table-column>
        <el-table-column label="标签" min-width="50">
          <template #default="scope">
            <div>
              <el-tag disable-transitions :type="scope.row.tag === 'jpg' ? 'primary' : 'success'">{{ scope.row.tag }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template #default="scope">
            <el-button type="primary" link icon="download" @click="download(scope.row)">下载</el-button>
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
import { getFilesList, deleteUser } from '@/api/api_file'
import newUser from '@/components/manage/newUser.vue'
import CustomPic from '@/components/manage/customPic.vue'
import ImageCompress from '@/utils/image'
import { formatDateT, downloadImage } from '../../utils/utils'

const tableData = ref([])

const addDialogShow = ref(false)
const currentPage = ref(1)
const limit = ref(20)
const total = ref(0)
const keyword = ref('')
const token = ref('')
token.value = localStorage.getItem('token')
const getData = async() => {
  const params = {
    page: currentPage.value,
    pageSize: limit.value,
    keyword: keyword.value
  }
  const res = await getFilesList(params)
  if (res.code === 200) {
    tableData.value = res.data.list
    total.value = res.data.total
  } else {
    ElMessage.error(res.msg)
  }
}
// 加载时请求页面列表
getData()
const fullscreenLoading = ref(false)

const checkFile = (file) => {
  fullscreenLoading.value = true
  const isJPG = file.type === 'image/jpeg'
  const isPng = file.type === 'image/png'
  // const isLt2M = file.size / 1024 / 1024 < 0.5
  if (!isJPG && !isPng) {
    ElMessage.error('上传图片只能是 jpg或png 格式!')
    fullscreenLoading.value = false
  }
  // if (!isLt2M) {
  //   ElMessage.error('未压缩的上传图片大小不能超过 500KB，请使用压缩上传')
  //   fullscreenLoading.value = false
  // }
  const isRightSize = file.size / 1024 < 512
  if (!isRightSize) {
    // 压缩
    const compress = new ImageCompress(file, 512, 1080)
    return compress.compress()
  }
  return (isPng || isJPG) && isRightSize
}
const handleExceed = (files, fileList) => {
  this.$message.warning(`当前限制选择 20 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
}
const uploadSuccess = (res) => {
  const { data } = res
  if (data.file) {
    getData()
  }
}

const uploadError = () => {
  ElMessage.error('上传失败')
  fullscreenLoading.value = false
}
// 重置
const resetParams = () => {
  keyword.value = ''
}
const curEditRow = ref('')
// 下载
const download = (row) => {
  const path = ref(`${localStorage.getItem('minioIP')}/admin-go/`)
  downloadImage(path.value + row.url, row.name)
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
// const switchEnable = async(row) => {
//   const params = {
//     id: row.id,
//     username: row.username,
//     phone: row.phone,
//     email: row.email,
//     enable: row.enable
//   }
//   const res = await editUser(params)
//   if (res.code === 200) {
//     ElMessage.success(`${row.enable === 2 ? '禁用' : '启用'}成功`)
//   }
// }
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
