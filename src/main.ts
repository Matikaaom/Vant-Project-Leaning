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
import liff from '@line/liff'
import thTH from './locale/lang/th-TH'
import { Locale } from 'vant'
import '@vant/touch-emulator'
import './assets/main.css'
import 'vant/lib/index.css'

const LIFF_ID = '2008284940-aZ5dYpXy'

async function bootstrap() {
  // mount app ก่อน เพื่อให้ router ใช้งานได้ทัน
  const app = createApp(App)
  Locale.use('th-TH', thTH)
  app.use(router)
  app.mount('#app')

  try {
    await liff.init({ liffId: LIFF_ID })
    console.log('✅ LIFF initialized')

    // ตรวจว่ามี code มาจาก LINE OAuth หรือไม่
    const hasCode = window.location.search.includes('code=')

    // ถ้ามี code ให้ล้าง query ทันทีเพื่อป้องกันการวน login ซ้ำ
    if (hasCode) {
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    // ถ้าไม่ได้เปิดจาก LINE client ให้ไปหน้า /line
    if (!liff.isInClient()) {
      router.replace('/line')
      return
    }

    // ถ้ายังไม่ login
    if (!liff.isLoggedIn()) {
      // ถ้ามี code อยู่ ให้รอ LIFF SDK ประมวลผล (อย่าเรียก login ซ้ำ)
      if (!hasCode) {
        // กำหนด redirect กลับมาที่ root (/)
        liff.login({ redirectUri: window.location.origin + '/' })
        return
      }
      // ถ้ามี hasCode แต่ยังไม่ isLoggedIn() ให้รอ (ไม่เรียก login)
    }

    // ถ้า login แล้ว ให้ดึง profile และถ้าอยู่หน้า /line ให้กลับไป /
    if (liff.isLoggedIn()) {
      const profile = await liff.getProfile()
      console.log('👤 LINE profile:', profile)
      if (window.location.pathname === '/line') {
        router.replace('/')
      }
    }
  } catch (err) {
    console.error('❌ LIFF init error:', err)
    router.replace('/line')
  }
}

// ป้องกัน bfcache (back/forward cache) ที่อาจคืนหน้าเก่าโดยไม่ reload
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    bootstrap().catch(e => console.error(e))
  }
})

// เรียก bootstrap ครั้งแรก
bootstrap().catch(e => console.error(e))



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

