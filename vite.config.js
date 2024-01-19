import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// 本地调试时，将api_online设置为false
let api_online = true

const online_url = 'http://word.stayhungry134.com:8000'
// const local_url = 'http://192.168.2.12:8000'
const local_url = 'http://127.0.0.1:8001'

// 根据api_online的值，选择api_url
let api_url = local_url
if (api_online) api_url = online_url

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  server: {
    // 设置代理可以让页面中匹配到 /word_api 的路由都被替代
    proxy: {
      '/word_api': {
        target: api_url,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/word_api/, '/word_api/')
      },
      // 设置代理可以让页面中匹配到 /word_media 的路由都被替代
      '/word_media': {
          target: api_url,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/word_media/, '/word_media/')
      },
    }
  },
})


