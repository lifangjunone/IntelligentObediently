<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/lishao2.png" alt="李氏集团李少" />
      <span>GOD</span>
    </div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      :collapse="collapse"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
    >
      <template v-for="item in userMenu" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.url">
            <template #title>
              <i v-if="item.icon" class="iconfont"> {{ item.icon }} </i>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.url" @click="handleClick(subitem)">
                <i v-if="subitem.icon" class="iconfont"> {{ subitem.icon }} </i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.url" @click="handleClick(item)">
            <i v-if="item.icon" class="iconfont"> {{ item.icon }} </i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})
const store = useStore()
const router = useRouter()
const userMenu = computed(() => store.state.login.userMenus)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClick = (data: any) => {
  router.push({
    path: data.url ?? '/not-found'
  })
}
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  // background-color: #001529;
  color: white;
  .logo {
    display: flex;
    height: 80px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    span {
      height: 100%;
      line-height: 80px;
      display: inline-block;
      font-size: 30px;
    }
    .img {
      display: inline-block;
      height: 100%;
      height: 100%;
      margin: 0 15px;
    }
  }
  .el-menu-vertical-demo {
    border-right: none;
    .el-menu-item.is-active {
      background-color: blue;
    }
    span {
      display: inline-block;
      font-size: 20px;
    }
    i {
      display: inline-block;
      margin-right: 10px;
      font-size: 20px;
    }
  }
}
.el-sub-menu {
  margin: 20px 0;
  .el-menu-item {
    margin: 20px 0;
  }
}
</style>
