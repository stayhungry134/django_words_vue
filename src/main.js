import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
// 注册路由
import router from './router'
app.use(router)

// 注册 elementUI
import ElementPlus from 'element-plus'
app.use(ElementPlus)

// 引入 elementUI 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 注册状态管理
const pinia = createPinia()
app.use(pinia)

// 引入全局样式
import '~/assets/css/scss/global.scss'

// 引入全局ts
import '~/assets/ts/common.ts'

app.mount('#app')
