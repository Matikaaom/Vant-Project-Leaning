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
import AppLayout from '@/components/AppLayout.vue'
import HomePage from '@/components/views/HomePage.vue'
import StepsPage from '@/components/views/StepsPage.vue'
import DashboardPage from '@/components/views/DashboardPage.vue'
import UserPage from '@/components/views/UserPage.vue'
import Checkline from '@/components/views/CheckLine.vue'
import liff from '@line/liff'

const LIFF_ID = '2008284940-aZ5dYpXy'

// 🔹 flag เก็บสถานะ init LIFF
let isLiffInited = false

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/line', name: 'line', component: Checkline },
  { path: '/steps', name: 'steps', component: StepsPage },
  { path: '/dashboard', name: 'dashboard', component: DashboardPage },
  { path: '/user', name: 'user', component: UserPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔹 Navigation Guard
router.beforeEach(async (to, from, next) => {
  if (to.path === '/line') return next() // ปล่อยหน้า /line

  try {
    // init LIFF ถ้ายังไม่ init
    if (!isLiffInited) {
      await liff.init({ liffId: LIFF_ID })
      isLiffInited = true
    }

    // ถ้าไม่ได้อยู่ใน LINE app หรือยังไม่ login → redirect /line
    if (!liff.isInClient() || !liff.isLoggedIn()) {
      return next('/line')
    }

    next() // login แล้ว → ไปหน้าปลายทาง
  } catch (err) {
    console.error('LIFF init error in router guard:', err)
    next('/line') // fallback
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


