<template>
  <div class="header">
    <slot name="header"></slot>
  </div>
  <div class="fj-form">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemLayout"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <!-- 方法一 -->
                <!-- <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="sonFormData[`${item.field}`]"
                ></el-input> -->
                <!-- 方法二 -->
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
  <div class="footer">
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
import { PropType, watch, ref } from 'vue'
import IFormItem from '../types'
const props = defineProps({
  // formData: {
  //   type: Object,
  //   required: true
  // },
  modelValue: {
    type: Object,
    required: true
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  labelWidth: {
    type: String,
    default: '100px'
  },
  itemLayout: {
    type: Object,
    default: () => ({ padding: '10px 40px' })
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  }
})
const emit = defineEmits(['update:modelValue'])
// modelValue: 父组件的值
// sonFormData: 子组件的值
// 子组件将父组件传过来的值进行结构，然后重新生成一个新值，目的: 防止子组件修改值影响父组件
// 方法一
// const sonFormData = ref({ ...props.modelValue })
// watch(
//   sonFormData,
//   (newValue) => {
//     console.log('xxxxx', sonFormData, newValue)
//     emit('update:modelValue', newValue)
//   },
//   {
//     deep: true
//   }
// )
// 子组件的值修改会影响父组件的值，因此子组件数据的变动不需要通过watch进行监控，然后在通过
// emit 进行发送事件给父组件进行更新数据
// 方法二
const sonFormData = ref(props.modelValue)
// 监控子组件的数据，然后修改父组件的数据
const handleValueChange = (value: any, field: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>
<style scoped lang="less">
.fj-form {
  padding-top: 22px;
  // .form-item {
  //   padding: 5px 30px;
  // }
}
</style>
