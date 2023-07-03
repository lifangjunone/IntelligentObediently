<template>
  <div class="page-search">
    <!-- <fj-form v-bind="searchFormConfig" :formData="formData"></fj-form> -->
    <fj-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="Refresh">重置</el-button>
          <el-button type="primary" icon="Search">搜索</el-button>
        </div>
      </template>
    </fj-form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import FjForm from '@/base-ui/form'
const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})
const formData = ref({
  id: '',
  name: '',
  password: '',
  sport: '',
  createTime: ''
})
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
