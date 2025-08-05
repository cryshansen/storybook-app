// 1. main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { registerSW } from 'virtual:pwa-register'

createApp(App).use(router).mount('#app')
registerSW({ immediate: true })

