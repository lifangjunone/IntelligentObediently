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
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
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
                  v-model="formData[`${item.field}`]"
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
const formData = ref({ ...props.modelValue })
watch(
  formData,
  (newValue) => {
    emit('update:modelValue', newValue)
  },
  {
    deep: true
  }
)
</script>
<style scoped lang="less">
.fj-form {
  padding-top: 22px;
  // .form-item {
  //   padding: 5px 30px;
  // }
}
</style>
