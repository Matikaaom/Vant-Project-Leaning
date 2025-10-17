// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import './assets/main.css'
// import 'vant/lib/index.css';
// import thTH from './locale/lang/th-TH'
// import { Locale } from 'vant';
// import '@vant/touch-emulator';
// import liff from '@line/liff'

//   const app = createApp(App)
//   Locale.use('th-TH', thTH)
//   app.use(router)
//   app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import 'vant/lib/index.css'
import thTH from './locale/lang/th-TH'
import { Locale } from 'vant'
import '@vant/touch-emulator'
import liff from '@line/liff'

const LIFF_ID = '2008284940-aZ5dYpXy'

async function bootstrap() {
  try {
    await liff.init({ liffId: LIFF_ID })
    console.log('✅ LIFF initialized')

    // 🔸 เคลียร์ query ?code=... หลัง login สำเร็จ
    if (window.location.search.includes('code=')) {
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    // 🔹 ถ้ายังไม่ login → login เลย (แต่จะไม่วน เพราะเคลียร์ query แล้ว)
    if (!liff.isLoggedIn()) {
      liff.login({ redirectUri: window.location.origin })
      return
    }

    const profile = await liff.getProfile()
    console.log('👤 LINE profile:', profile)

    const app = createApp(App)
    Locale.use('th-TH', thTH)
    app.use(router)
    app.mount('#app')
  } catch (error) {
    console.error('❌ LIFF init failed:', error)
    const app = createApp(App)
    Locale.use('th-TH', thTH)
    app.use(router)
    app.mount('#app')
  }
}

bootstrap()

  

// const LIFF_ID = '2008284940-aZ5dYpXy' // ใส่ LIFF ID จริง

// async function bootstrap() {
//   await liff.init({ liffId: LIFF_ID })

//   if (!liff.isLoggedIn()) {
//     liff.login()
//   } else {

//     const app = createApp(App)
//     Locale.use('th-TH', thTH)
//     app.use(router)
//     app.mount('#app')
//   }
// }

// bootstrap()

// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import './assets/main.css'
// import 'vant/lib/index.css';
// import thTH from './locale/lang/th-TH'
// import { Locale } from 'vant';
// import '@vant/touch-emulator';
// import liff from '@line/liff'

// const LIFF_ID = '2008284940-aZ5dYpXy'
// const EXPIRE_TIME = 1 * 60 * 1000 // 30 นาที

// async function bootstrap() {
//   await liff.init({ liffId: LIFF_ID })

//   const loginTime = localStorage.getItem('loginTime')
//   const now = Date.now()

//   // ถ้าเลย 30 นาทีแล้ว → logout
//   if (loginTime && now - Number(loginTime) > EXPIRE_TIME) {
//     console.log('Session expired, logging out...')
//     localStorage.removeItem('loginTime')
//     liff.logout()
//     window.location.reload()
//     return
//   }

//   if (!liff.isLoggedIn()) {
//     liff.login()
//   } else {
//     if (!loginTime) {
//       localStorage.setItem('loginTime', String(now))
//     }

//     const profile = await liff.getProfile()
//     console.log('LINE Profile:', profile)

//     const app = createApp(App)
//     Locale.use('th-TH', thTH)
//     app.use(router)
//     app.mount('#app')
//   }
// }

// bootstrap()

