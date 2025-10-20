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
  const app = createApp(App)
  Locale.use('th-TH', thTH)
  app.use(router)
  app.mount('#app')
// const LIFF_ID = '2008284940-aZ5dYpXy'

// ตัวแปรสำหรับเก็บ instance ของ Vue App
// let app = null

// async function bootstrap() {
//   // 1. Mount app ก่อน เพื่อให้ router ใช้งานได้ทันที
//   if (!app) {
//     app = createApp(App)
//     Locale.use('th-TH', thTH)
//     app.use(router)
//     app.mount('#app')
//   }

//   // ตรวจสอบว่ามี code มาจาก LINE OAuth หรือไม่ (เก็บไว้ใช้เป็น Flag)
//   const hasCode = window.location.search.includes('code=')

//   // *** สำคัญ: เราจะไม่ล้าง code ออกจาก URL ทันทีในตอนนี้ ***
//   // เราจะล้างหลังจากที่ LIFF ยืนยันว่า Login สำเร็จแล้วเท่านั้น

//   try {
//     await liff.init({ liffId: LIFF_ID })
//     console.log('✅ LIFF initialized')

//     // 2. ถ้าไม่ได้เปิดจาก LINE client (เปิดด้วย Browser ทั่วไป)
//     if (!liff.isInClient()) {
//       router.replace('/line')
//       return
//     }

//     // 3. ถ้ายังไม่ login
//     if (!liff.isLoggedIn()) {
//       // 3.1 ถ้ามี code อยู่: แสดงว่า LIFF กำลังประมวลผลอยู่ (หรือมี Error)
//       //     เราต้อง **ห้าม** เรียก liff.login() ซ้ำ
//       if (hasCode) {
//         console.log('⏳ Found code, waiting for LIFF to complete login exchange (must not call liff.login()).')
//         return
//       }

//       // 3.2 ถ้าไม่มี code: และยังไม่ logged in ให้เรียก login
//       console.log('❌ Not logged in and no code found. Initiating LIFF login.')
//       liff.login({ redirectUri: window.location.origin + '/' })
//       return
//     }

//     // 4. ถ้า login แล้ว (liff.isLoggedIn() เป็น true)
//     if (liff.isLoggedIn()) {
//       // 4.1 ดึง Profile
//       const profile = await liff.getProfile()
//       console.log('👤 LINE profile:', profile)

//       // 4.2 จัดการล้าง Code ออกจาก URL (ทำได้เพราะยืนยันว่า Login สำเร็จแล้ว)
//       if (hasCode) {
//           window.history.replaceState({}, document.title, window.location.pathname)
//           console.log('✅ Login confirmed. Code removed from URL.')
//       }

//       // 4.3 จัดการ Routing (ป้องกันการวนลูปจาก Back Button)
//       if (window.location.pathname === '/line') {
//         console.log('🔄 Logged in on /line, redirecting to /')
//         router.replace('/')
//       }
//     }
//   } catch (err) {
//     console.error('❌ LIFF init error:', err)
//     // หากเกิด Error ให้ไปหน้า Login เผื่อไว้
//     router.replace('/line')
//   }
// }

// // ป้องกัน bfcache (back/forward cache)
// window.addEventListener('pageshow', (event) => {
//   if (event.persisted) {
//      bootstrap().catch(e => console.error(e))
//    }
// })

// // เรียก bootstrap ครั้งแรก
// bootstrap().catch(e => console.error(e))



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

