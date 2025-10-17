// import { createRouter, createWebHistory } from 'vue-router'
// import AppLayout from '@/components/AppLayout.vue'
// import HomePage from '@/components/views/HomePage.vue'
// import StepsPage from '@/components/views/StepsPage.vue'
// import DashboardPage from '@/components/views/DashboardPage.vue'
// import UserPage from '@/components/views/UserPage.vue'
// import Checkline from '@/components/views/CheckLine.vue'
// import liff from "@line/liff"

// const routes = [
//   // { path: '/', component: AppLayout },
//   { path: '/', name: 'home', component: HomePage },
//   { path: '/line', name: 'line', component: Checkline} ,
//   { path: '/steps', name: 'steps', component: StepsPage },
//   { path: '/dashboard', name: 'dashboard', component: DashboardPage },
//   { path: '/user', name: 'user', component: UserPage }
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/views/HomePage.vue'
import StepsPage from '@/components/views/StepsPage.vue'
import DashboardPage from '@/components/views/DashboardPage.vue'
import UserPage from '@/components/views/UserPage.vue'
import Checkline from '@/components/views/CheckLine.vue'
import liff from '@line/liff'

const LIFF_ID = '2008284940-aZ5dYpXy'
let isLiffInited = false

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/line', name: 'line', component: Checkline },
  { path: '/steps', name: 'steps', component: StepsPage },
  { path: '/dashboard', name: 'dashboard', component: DashboardPage },
  { path: '/user', name: 'user', component: UserPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  // ✅ ปล่อยหน้า /line ผ่าน
  if (to.path === '/line') return next()

  try {
    // ✅ init LIFF ครั้งเดียว
    if (!isLiffInited) {
      await liff.init({ liffId: LIFF_ID })
      isLiffInited = true
      console.log('✅ LIFF initialized')
    }

    // ✅ ถ้าอยู่นอก LINE app (เปิดจาก browser)
    // ให้ redirect ไปหน้า /line เฉพาะตอนเข้าเว็บครั้งแรก
    if (!liff.isInClient()) {
      if (from.path === '/line' || from.path === '/') {
        return next('/line')
      } else {
        return next()
      }
    }

    // ✅ ถ้าอยู่ใน LINE app แต่ยังไม่ได้ login
    if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: window.location.href })
    return
  }


    next()
  } catch (err) {
    console.error('❌ LIFF init error:', err)
    next('/line')
  }
})

export default router



// router.beforeEach((to, from, next) => {
//   if (to.path === '/') {
//     // redirect ไปหน้าเช็กก่อน
//     next('/line')
//   } else {
//     next()
//   }
// })

// router.beforeEach(async (to, from, next) => {
//   if (!liff.isInClient() && to.path !== '/line') {
//     next('/line')
//   } else {
//     next()
//   }
// })


// export default router


