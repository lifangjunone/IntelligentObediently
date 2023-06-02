<template>
  <div class="home">
    <homeMenu />
    <div class="mainRouter">
      <homeHeader />
      <div class="homeView">
        <div class="homeView-content">
          <router-view ref="childRouter" v-slot="{ Component }">
            <transition name="move" mode="out-in">
              <component :is="Component"></component>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import homeHeader from '@/components/home/homeHeader.vue'
import homeMenu from '@/components/home/homeMenu.vue'
</script>
<script>
export default {
  name: 'Home'
}
</script>
<style scoped lang="scss">
.home {
  height: 100%;
  width: 100%;
  display: flex;
  .mainRouter {
    flex: 1;
    display: flex;
    flex-direction: column;
    .homeView {
      height: 0;
      flex: 1;
      display: flex;
      background-color: #fff;
      .homeView-content {
        flex: 1;
        width: 0;
        height: 100%;
        padding: 12px 16px;
        box-sizing: border-box;
        background-color: #f0f2f5;
      }
    }
  }
}
</style>
