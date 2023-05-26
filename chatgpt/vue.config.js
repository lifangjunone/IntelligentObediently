const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    compress: false, // 不能压缩，不然不支持　stream 响应
    proxy: {
      "/api": {
        target: "http://192.168.137.228:8000",
        ws: true,
        changeOrigin: true,
      },
    },
  },
})
