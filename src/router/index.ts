import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import HomePage from '@/components/views/HomePage.vue'
import StepsPage from '@/components/views/StepsPage.vue'
import DashboardPage from '@/components/views/DashboardPage.vue'
import UserPage from '@/components/views/UserPage.vue'
import CheckMobile from '@/components/views/CheckMobile.vue'
import liff from "@line/liff"

const routes = [
  // { path: '/', component: AppLayout },
  { path: '/', name: 'home', component: HomePage, redirecredirect: '/mobile' },
  { path: '/mobile', name: 'mobile', component: CheckMobile} ,
  { path: '/steps', name: 'steps', component: StepsPage },
  { path: '/dashboard', name: 'dashboard', component: DashboardPage },
  { path: '/user', name: 'user', component: UserPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (!liff.isInClient() && to.path !== '/mobile') {
    next('/mobile')
  } else {
    next()
  }
})

export default router


