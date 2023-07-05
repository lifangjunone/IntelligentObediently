<template>
  <div class="page-search">
    <!-- <fj-form v-bind="searchFormConfig" :formData="formData"></fj-form> -->
    <fj-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
          <el-button type="primary" icon="Search" @click="handleSearchClick"
            >搜索</el-button
          >
        </div>
      </template>
    </fj-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FjForm from '@/base-ui/form'
const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['searchClick', 'resetClick'])
const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
console.log(formOriginData)
const formData = ref(formOriginData)
const handleResetClick = () => {
  // 方法一
  // for (const key in formOriginData) {
  //   // formData.value[`${key}`] = formOriginData[key]
  //   formData.value[`${key}`] = ''
  // }
  // 方法二
  formData.value = formOriginData
  emit('resetClick')
}
const handleSearchClick = () => {
  console.log('点击搜索了')
  emit('searchClick', formData.value)
}
</script>

<style scoped lang="less">
.page-search {
  padding-top: 20px;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
