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

// ตัวแปรสำหรับเก็บ instance ของ Vue App
let app = null

async function bootstrap() {
  // 1. Mount app ก่อน เพื่อให้ router ใช้งานได้ทันที
  if (!app) {
    app = createApp(App)
    Locale.use('th-TH', thTH)
    app.use(router)
    app.mount('#app')
  }

  try {
    await liff.init({ liffId: LIFF_ID })
    console.log('✅ LIFF initialized')

    // 2. ตรวจว่ามี code มาจาก LINE OAuth หรือไม่
    const hasCode = window.location.search.includes('code=')

    // 3. ถ้ามี code ให้ล้าง query ทันทีเพื่อป้องกันการวน login ซ้ำ
    if (hasCode) {
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    // 4. ถ้าไม่ได้เปิดจาก LINE client (เปิดด้วย Browser ทั่วไป)
    if (!liff.isInClient()) {
      // นำผู้ใช้ไปยังหน้า /line เพื่อให้เห็นปุ่ม Login หรือคำแนะนำ
      router.replace('/line')
      return
    }

    // 5. ถ้าอยู่ใน LINE client และยังไม่ login
    if (!liff.isLoggedIn()) {
      // ถ้าไม่มี code (หมายถึงยังไม่เคยถูก redirect ไปหน้า Login) ให้เรียก login
      if (!hasCode) {
        console.log('⏳ Not logged in, redirecting to LINE Login...')
        // กำหนด redirect กลับมาที่ root (/) เพื่อให้เริ่มกระบวนการใหม่
        liff.login({ redirectUri: window.location.origin + '/' })
        return
      }
      // ถ้ามี hasCode แต่ยังไม่ isLoggedIn() ให้รอ LIFF SDK ประมวลผล (ไม่เรียก login ซ้ำ)
      return
    }

    // 6. ถ้า login แล้ว (liff.isLoggedIn() เป็น true)
    if (liff.isLoggedIn()) {
      const profile = await liff.getProfile()
      console.log('👤 LINE profile:', profile)

      // ตรวจสอบว่าผู้ใช้อยู่ที่หน้า /line หรือไม่
      if (window.location.pathname === '/line') {
        // ถ้าอยู่ที่หน้า /line (เช่น กด Back Button กลับมา) ให้เปลี่ยนไปหน้า Home ทันที
        // เพื่อป้องกันไม่ให้เกิดการ "เด้งกลับ" ไปที่ /line อีก
        console.log('🔄 Logged in on /line, redirecting to /')
        router.replace('/')
      }
      // ถ้าอยู่ที่หน้า Home (/) หรือหน้าอื่นอยู่แล้ว จะไม่ทำอะไรต่อ
    }

  } catch (err) {
    console.error('❌ LIFF init error:', err)
    // หากเกิด Error ให้ไปหน้า Login เผื่อไว้
    router.replace('/line')
  }
}

// **ข้อควรระวัง:**
// การจัดการ bfcache (back/forward cache) โดยการเรียก bootstrap() ซ้ำ อาจนำไปสู่
// ปัญหา race condition หรือการ re-mount app ซ้ำซ้อน แต่ถูกเก็บไว้เนื่องจากอยู่ในโค้ดเดิมของคุณ
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    // Re-run bootstrap logic when loaded from cache
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

