<template>
  <el-menu-item :index="routerInfo.name">
    <template v-if="isCollapse">
      <el-tooltip class="box-item" effect="light" :content="routerInfo.title" placement="right">
        <el-icon v-if="routerInfo.icon">
          <component :is="routerInfo.icon" />
        </el-icon>
      </el-tooltip>
    </template>
    <template v-else>
      <div class="gva-menu-item">
        <el-icon v-if="routerInfo.icon">
          <component :is="routerInfo.icon" />
        </el-icon>
        <span class="gva-menu-item-title">{{ routerInfo.title }}</span>
      </div>
    </template>
  </el-menu-item>
</template>

<script>
export default {
  name: 'MenuItem'
}
</script>
<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  routerInfo: {
    default() {
      return null
    },
    type: Object
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

const activeBackground = ref(props.theme.activeBackground)
const activeText = ref(props.theme.activeText)
const normalText = ref(props.theme.normalText)
const hoverBackground = ref(props.theme.hoverBackground)
const hoverText = ref(props.theme.hoverText)

watch(
  () => props.theme,
  () => {
    activeBackground.value = props.theme.activeBackground
    activeText.value = props.theme.activeText
    normalText.value = props.theme.normalText
    hoverBackground.value = props.theme.hoverBackground
    hoverText.value = props.theme.hoverText
  }
)
</script>

<style lang="scss" scoped>
.gva-menu-item {
  width: 100%;
  flex: 1;
  height: 44px;
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  color: rgba(245,245,245,0.5);
  .gva-menu-item-title {
    flex: 1;
  }
}

.el-menu-item.is-active {
  .gva-menu-item {
    background: rgba(245,245,245,0.1);
    border-radius: 4px;
    i {
      color: v-bind(activeText);
    }
    span {
      color: v-bind(activeText);
    }
  }
}

.el-menu-item:hover {
  background-color: inherit;
  // .gva-menu-item {
  //   background: v-bind(hoverBackground);
  //   border-radius: 4px;
  //   box-shadow: 0 0 2px 1px v-bind(hoverBackground);
  //   color: v-bind(hoverText);
  // }
}
</style>
