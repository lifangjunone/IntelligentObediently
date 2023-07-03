<template>
  <div class="user">
    <div class="search">
      <fj-form v-bind="searchFormConfig"></fj-form>
    </div>
    <div class="content"></div>
  </div>
</template>

<script setup lang="ts">
import FjForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'
</script>

<style scoped lang="less"></style>
