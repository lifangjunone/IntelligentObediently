<template>
  <div class="fj-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}列表</div>
        <div class="handle">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      v-bind="childrenProps"
      :data="dataList"
      border
      style="width: 100%"
      @selection-change="handleSelectChange"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        minWidth="50"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        minWidth="60px"
        align="center"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          v-model:current-page="pageInfo.page"
          v-model:page-size="pageInfo.size"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['selectionChange', 'update:pageInfo'])
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  pageInfo: {
    type: Object,
    default: () => ({ page: 0, size: 10 })
  },
  dataCount: {
    type: Number,
    default: 0
  },
  dataList: {
    type: Array,
    required: true
  },
  propList: {
    type: Array,
    required: true
  },
  showIndexColumn: {
    type: Boolean,
    default: false
  },
  showSelectColumn: {
    type: Boolean,
    default: false
  },
  childrenProps: {
    type: Object,
    default: () => ({})
  },
  showFooter: {
    type: Boolean,
    default: true
  }
})
const handleSelectChange = (value: any) => {
  emit('selectionChange', value)
}
const handleSizeChange = (size: number) => {
  // emit('update:queryInfo', { ...props.queryInfo, size: size })
  emit('update:pageInfo', { ...props.pageInfo, size })
}
const handleCurrentChange = (page: number) => {
  emit('update:pageInfo', { ...props.pageInfo, page })
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  line-height: 32px;
  box-sizing: border-box;
  .title {
    font-weight: 700;
    font-size: 22px;
  }
  .handle {
  }
}
.el-pagination {
  justify-content: center;
}
</style>
