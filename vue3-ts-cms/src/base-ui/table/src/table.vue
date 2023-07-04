<template>
  <div class="fj-table">
    <el-table :data="dataList" border style="width: 100%">
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center" />
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dataList: {
    type: Array,
    required: true
  },
  propList: {
    type: Array,
    required: true
  }
})
</script>

<style scoped></style>
