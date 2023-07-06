<template>
  <div>
    <page-content
      :contentTableConfig="contentTableConfig"
      :requestInfo="requestInfo"
    >
      <template #image="scope">
        <el-image
          style="width: 60px; height: 100px"
          :src="scope.row.imageUrl"
          :preview-src-list="[scope.row.imageUrl]"
          :preview-teleported="true"
        />
      </template>
      <template #oldPrice="scope">
        {{ '￥' + scope.row.oldPrice }}
      </template>
    </page-content>
  </div>
</template>

<script setup lang="ts">
// 定义插槽的时候可以为动态绑定一些数据到属性上，在外面给插槽传递数据的时候可以使用定义时绑定的属性名来获取数据
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
import { requestInfo } from './config/request.config'
</script>

<style scoped></style>
