import { defineConfig } from 'vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname'
import eslintPlugin from 'vite-plugin-eslint'

// const pythonDomain = 'http://localhost:8086'
const pythonDomain = 'http://10.31.1.193:8008'
// let pythonDomain = 'http://10.31.1.120:8720/alertmanager-wechat-robot' // / kaizhao
// let pythonDomain = 'http://10.31.1.120:8720' // / 测试
export default defineConfig({
  plugins: [
    vue(),
    manualChunksPlugin(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    proxy: {
      '/api/v1': {
        target: `${pythonDomain}/api/v1`,
        changeOrigin: true,
        ws: true,
        // eslint-disable-next-line no-shadow
        rewrite: (path) => path.replace('/api/v1', '')
      }
    }
  },
  css: {
    devSourcemap: true // 开启 CSS source maps
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      components: path.resolve(__dirname, 'src/components')
    }
  }
})
