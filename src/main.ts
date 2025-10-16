import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import 'vant/lib/index.css';
import thTH from './locale/lang/th-TH'
import { Locale } from 'vant';
import '@vant/touch-emulator';
import liff from '@line/liff'

const LIFF_ID = '2008284940-aZ5dYpXy' // ใส่ LIFF ID จริง

// ครอบ if...else ง่าย ๆ
function bootstrap() {
  liff.init({ liffId: LIFF_ID })

  if (!liff.isLoggedIn()) {
    // ยังไม่ login → redirect ไป LINE login
    liff.login()
  } else {
    // login แล้ว → mount Vue app
    const app = createApp(App)
    Locale.use('th-TH', thTH)
    app.use(router)
    app.mount('#app')
  }
}

bootstrap()
