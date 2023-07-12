<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useChart } from '@/hooks/use-chart'
const props = defineProps({
  options: {
    type: Object,
    default: () => ({})
    // default: () => {
    //   return {}
    // }
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '480px'
  },
  isChange: {
    type: Boolean,
    default: false
  }
})
const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  const [echartInstance, fjSetOption] = useChart(echartDivRef.value)
  if (props.isChange) {
    fjSetOption(props.options)
    setInterval(function () {
      var date = new Date()
      var second = date.getSeconds()
      var minute = date.getMinutes() + second / 60
      var hour = (date.getHours() % 12) + minute / 60

      props.options.animationDurationUpdate = 300
      echartInstance.setOption({
        series: [
          {
            name: 'hour',
            animation: hour !== 0,
            data: [{ value: hour }]
          },
          {
            name: 'minute',
            animation: minute !== 0,
            data: [{ value: minute }]
          },
          {
            animation: second !== 0,
            name: 'second',
            data: [{ value: second }]
          }
        ]
      })
    }, 1000)
  } else {
    watchEffect(() => {
      fjSetOption(props.options)
    })
  }
})
</script>

<style scoped></style>
