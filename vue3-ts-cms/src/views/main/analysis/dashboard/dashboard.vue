<template>
  <div class="dashboard">
    <el-row :gutter="gutter">
      <el-col :span="7">
        <fj-card title="分类商品数据（饼图）">
          <pie-echart :pieData="pieData"></pie-echart>
        </fj-card>
      </el-col>
      <el-col :span="10">
        <fj-card title="不同城市商品销量">
          <time-echart :isChange="isChange"></time-echart>
        </fj-card>
      </el-col>
      <el-col :span="7">
        <fj-card title="分类商品数量（玫瑰图）">
          <rose-echart :roseData="pieData"></rose-echart>
        </fj-card>
      </el-col>
    </el-row>

    <el-row :gutter="gutter" class="shop-content">
      <el-col :span="12">
        <fj-card title="分类商品销量">
          <line-echart v-bind="saleData"></line-echart>
        </fj-card>
      </el-col>
      <el-col :span="12">
        <fj-card title="分类商品收藏">
          <bar-echart v-bind="favoData"></bar-echart>
        </fj-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { computed } from 'vue'
import FjCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BaseEchart,
  TimeEchart
} from '@/components/page-charts'
const gutter = 10
const store = useStore()
const isChange = true

store.dispatch('dashboard/getDashboardDataAction')
const pieData = computed(() => {
  return store.state.dashboard.categoryGoodsCount.map((item: any) => {
    return { name: item.name, value: item.goodsCount }
  })
})
const saleData = computed(() => {
  const labels: string[] = []
  const values: any[] = []
  const goodsSale = store.state.dashboard.categoryGoodsSale
  for (const item of goodsSale) {
    labels.push(item.name)
    values.push(item.goodsCount)
  }
  return { labels, values }
})
const favoData = computed(() => {
  const labels: string[] = []
  const values: any[] = []
  const goodsSale = store.state.dashboard.categoryGoodsFavor
  for (const item of goodsSale) {
    labels.push(item.name)
    values.push(item.goodsCount)
  }
  return { labels, values }
})
</script>

<style scoped lang="less">
.shop-content {
  margin-top: 15px;
}
</style>
