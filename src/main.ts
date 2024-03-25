import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
import '@/assets/icon/iconfont.js'
import router from './router'
import 'normalize.css/normalize.css'
import '@/assets/font/font.css'
import App from './App'
import directives from '@/utils/directives'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(router).use(pinia).use(directives).use(ContextMenu).mount('#app')
