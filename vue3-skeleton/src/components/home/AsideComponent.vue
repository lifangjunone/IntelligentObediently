<template>
  <component :is="menuComponent" v-if="!routerInfo.hidden" :is-collapse="isCollapse" :theme="theme" :router-info="routerInfo">
    <template v-if="routerInfo.children && routerInfo.children.length">
      <AsideComponent v-for="item in routerInfo.children" :key="item.name" :is-collapse="false" :router-info="item" :theme="theme" />
    </template>
  </component>
</template>

<script>
export default {
  name: 'AsideComponent'
}
</script>
<script setup>
import { computed } from 'vue'
import MenuItem from './menuItem.vue'
import AsyncSubmenu from './asyncSubmenu.vue'

const props = defineProps({
  routerInfo: {
    type: Object,
    default: () => null
  },
  isCollapse: {
    default() {
      return false
    },
    type: Boolean
  },
  theme: {
    default() {
      return {}
    },
    type: Object
  }
})

const menuComponent = computed(() => {
  if (props.routerInfo.children && props.routerInfo.children.filter((item) => !item.hidden).length) {
    return AsyncSubmenu
  }
  return MenuItem
})
</script>
