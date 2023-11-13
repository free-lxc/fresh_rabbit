import '@/styles/common.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { lazyPlugin } from "@/directives/index"
import { componentPlugin } from '@/components'

import App from './App.vue'
import router from './router'
const pinIa = createPinia()
pinIa.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(componentPlugin)
app.use(pinIa)
app.use(router)
app.use(lazyPlugin)
app.mount('#app')
