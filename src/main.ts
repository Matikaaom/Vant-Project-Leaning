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
  const app = createApp(App)
  Locale.use('th-TH', thTH)
  app.use(router)
  app.mount('#app')

  try {
    await liff.init({ liffId: LIFF_ID })
    console.log('✅ LIFF initialized')

    // ถ้ามี code ใน URL แปลว่ากำลังถูก redirect มาจาก LINE OAuth
    const hasCode = window.location.search.includes('code=')

    // เคลียร์ query เพื่อไม่ให้วนซ้ำ (แต่ยังเก็บ hasCode ไว้ใช้ตัดสินใจ)
    if (hasCode) {
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    // ถ้าไม่ได้เปิดจาก LINE client → ไป /line เพื่อแสดงหน้าบอกให้เปิดผ่านแอป LINE
    if (!liff.isInClient()) {
      router.replace('/line')
      return
    }

    // ถ้ายังไม่ login
    if (!liff.isLoggedIn()) {
      // ถ้าเพิ่งถูก redirect กลับมาจาก LINE (hasCode === true) อย่าเรียก login ซ้ำ
      if (!hasCode) {
        liff.login({ redirectUri: window.location.origin + '/' })
        return
      }
      // ถ้ามี hasCode แต่ liff.isLoggedIn() ยัง false รอให้ LIFF SDK ประมวลผลต่อ (อย่าเรียก login)
    }

    // ถ้าเข้ามาถึงตรงนี้และ login แล้ว → ดึง profile แล้ว redirect จาก /line ไป /
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

// ป้องกันกรณี bfcache (back/forward cache) ที่คืนสถานะหน้าเก่าโดยไม่ reload
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    // เมื่อเข้ามาจาก bfcache ให้รัน bootstrap อีกครั้งเพื่อรีเช็ค state
    bootstrap().catch(e => console.error(e))
  }
})

// เรียกครั้งแรก
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

