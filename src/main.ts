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
  // สร้างและ mount app ก่อน เพื่อให้ router ใช้งานได้ทันที
  const app = createApp(App)
  Locale.use('th-TH', thTH)
  app.use(router)
  app.mount('#app')

  try {
    await liff.init({ liffId: LIFF_ID })
    console.log('✅ LIFF initialized')

    // เคลียร์ query ?code=... และพารามิเตอร์อื่นที่ LIFF ส่งมา (จะไม่ reload หน้า)
    if (window.location.search.includes('code=')) {
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    // ถ้าไม่ได้เปิดใน LINE client → ให้ไปหน้า /line (แจ้งให้เปิดในแอป LINE)
    if (!liff.isInClient()) {
      // ถ้ต้องการให้แสดงหน้า /line ให้ใช้ router.push
      router.replace('/line')
      return
    }

    // ถ้ายังไม่ได้ login → เรียก login และใช้ redirectUri ชัดเจนกลับมาที่ root (home)
    if (!liff.isLoggedIn()) {
      liff.login({ redirectUri: window.location.origin + '/' })
      return
    }

    // ถ้า login แล้ว ให้ดึง profile และถ้าจำเป็นให้ redirect ไปหน้า home (root)
    const profile = await liff.getProfile()
    console.log('👤 LINE profile:', profile)

    // ถ้า URL ปัจจุบันเป็น /line ให้กลับไปหน้า root (home)
    if (window.location.pathname === '/line' || window.location.pathname === '/login') {
      router.replace('/')
    }

  } catch (error) {
    console.error('❌ LIFF init failed:', error)
    // ถ้า init ล้มเหลว ให้ไปหน้า /line เพื่อแจ้งผู้ใช้
    router.replace('/line')
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

