<template>
  <div class="homeMenu">
    <div class="menuTitle">
      <el-avatar :size="30" :src="headerImg" />
      <span class="text">PMS管理平台</span>
    </div>
    <el-scrollbar style="height: calc(100vh - 60px)">
      <transition :duration="{ enter: 800, leave: 100 }" mode="out-in" name="el-fade-in-linear">
        <el-menu :collapse="isCollapse" :collapse-transition="false" :default-active="active" :background-color="theme.background" :active-text-color="theme.active" class="el-menu-vertical" unique-opened @select="selectMenuItem">
          <template v-for="item in list">
            <AsideComponent v-if="!item.hidden" :key="item.name" :is-collapse="isCollapse" :router-info="item" :theme="theme" />
          </template>
        </el-menu>
      </transition>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'HomeMenu'
}
</script>
<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import AsideComponent from '@/components/home/AsideComponent.vue'
import defaultHeadImg from '@/assets/ebondlogo.png'

const headerImg = ref(defaultHeadImg)

const list = ref([])
const route = useRoute()
const router = useRouter()

list.value = router.options.routes[1].children.filter((item) => item.type === 0)
const theme = ref({})

const getTheme = () => {
  // switch (userStore.sideMode) {
  switch ('#191a23') {
    case '#fff':
      theme.value = {
        background: '#fff',
        activeBackground: 'var(--el-color-primary)',
        activeText: '#fff',
        normalText: '#333',
        hoverBackground: 'rgba(64, 158, 255, 0.08)',
        hoverText: '#333'
      }
      break
    case '#191a23':
      theme.value = {
        background: '#191a23',
        activeBackground: 'var(--el-color-primary)',
        activeText: '#fff',
        normalText: '#fff',
        hoverBackground: 'rgba(64, 158, 255, 0.08)',
        hoverText: '#fff'
      }
      break
    default:
      break
  }
}
const userStore = useUserStore()
getTheme()
const active = ref('')
watch(
  () => route,
  () => {
    active.value = route.activeName || route.name
    // 存储当前路由信息
    const curRouteInfo = list.value.find((item) => item.name === active.value)
    userStore.setRouterBreadcrumb([curRouteInfo])
  },
  { deep: true }
)

// watch(() => userStore.sideMode, () => {
//   getTheme()
// })
const isCollapse = ref(false)

const initPage = () => {
  active.value = route.activeName || route.name
  // 存储当前路由信息
  const curRouteInfo = list.value.find((item) => item.name === active.value)
  userStore.setRouterBreadcrumb([curRouteInfo])
  const screenWidth = document.body.clientWidth
  if (screenWidth < 1000) {
    isCollapse.value = !isCollapse.value
  }

  // emitter.on('collapse', (item) => {
  //   isCollapse.value = item
  // })
}

initPage()
const selectMenuItem = (index, _, ele, aaa) => {
  if (index === route.name) return
  router.push({ name: index })
}
</script>
<style scoped lang="scss">
.homeMenu {
  width: 220px;
  height: 100%;
  color: #fff;
  background-color: #364E6B;
  .menuTitle {
    height: 60px;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    padding-left: 20px;
    box-sizing: border-box;
    :deep(.el-avatar){
      background-color: #FFF;
    }
    .text{
      padding-left: 10px;
    }
  }
  :deep(.el-menu) {
    border-right: none;
  }
}
</style>
