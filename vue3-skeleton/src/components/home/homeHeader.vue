<template>
  <div class="homeHeader">
    <div class="headerContent">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in userStore.routerBreadcrumb" :key="item.title">{{ item.title }}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>promotion management</el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <div class="headerRight">
      <el-popover placement="bottom" width="160" popper-class="photoPanel" trigger="click" ref="myPopover">
        <div class="panelDiv">
          <ul>
            <li v-for="(item, index) in list" :key="index" @click="selectLi(item.value)">
              {{ item.name }}
            </li>
          </ul>
        </div>
        <template #reference>
          <div class="headerInfo">
            <el-avatar :size="30" :src="headerImg" />
            <span class="name">{{ username }}</span>
          </div>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader'
}
</script>
<script setup>
import { ref } from 'vue'
import router from '@/router'
import { useUserStore } from '@/store/user'
import { ArrowRight } from '@element-plus/icons-vue'
// import {storeToRefs} from "pinia"
import defaultHeadImg from '@/assets/defaultHeadImg.png'

const headerImg = ref(defaultHeadImg)
const list = ref([
  {
    name: '退出登录',
    value: 1
  }
])
const userStore = useUserStore()
const username = ref('')
username.value = localStorage.getItem('username')
const selectLi = (value) => {
  const myPopover = ref(null)
  if (myPopover.value) {
    myPopover.value.close()
  }
  if (value === 1) {
    router.push({
      path: '/login'
    })
  } else if (value === 2) {
    console.log(1)
  }
}
</script>
<style scoped lang="scss">
.homeHeader {
  height: 60px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e4e7ed;
  box-sizing: border-box;
  .headerContent {
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    :deep(.el-breadcrumb) {
      font-size: 16px;
    }
  }
  .headerRight {
    .headerInfo {
      display: flex;
      align-items: center;
      cursor: pointer;
      .name {
        padding: 0 10px;
      }
    }
  }
}
</style>
