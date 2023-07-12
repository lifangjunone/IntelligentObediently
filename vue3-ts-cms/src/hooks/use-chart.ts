import * as echarts from 'echarts'

export function useChart(el: HTMLElement) {
  const echartInstance = echarts.init(el)
  const fjSetOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
  return [echartInstance, fjSetOptions]
}
