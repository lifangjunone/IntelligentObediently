<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside class="page-left" :width="isCollapse ? '60px' : '240px'">
        <nav-menu :collapse="isCollapse"></nav-menu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @changeFold="changeMainFold"></nav-header>
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'

const isCollapse = ref(false)
const changeMainFold = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .main-content {
    height: 100%;
    .page {
      height: 100%;
      .page-content {
        height: calc(100%-48px);
        .page-info {
          margin-top: 10px;
          background-color: white;
        }
      }
    }
  }
}
.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}
.el-header {
  height: 80px !important;
}
.el-aside {
  overflow: hidden;
  overflow: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #545c64;
  transition: width 0.3s linear;
  scrollbar-width: none;
  -ms-overflow-stype: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
