import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import thTH from './locale/lang/th-TH'
import { Locale } from 'vant'
import '@vant/touch-emulator'
import './assets/main.css'
import 'vant/lib/index.css'

  const app = createApp(App)
  Locale.use('th-TH', thTH)
  app.use(router)
  app.mount('#app')

