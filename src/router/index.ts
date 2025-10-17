import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import HomePage from '@/components/views/HomePage.vue'
import StepsPage from '@/components/views/StepsPage.vue'
import DashboardPage from '@/components/views/DashboardPage.vue'
import UserPage from '@/components/views/UserPage.vue'
import Checkline from '@/components/views/CheckLine.vue'

const routes = [
  // { path: '/', component: AppLayout },
  { path: '/', name: 'home', component: HomePage },
  { path: '/line', name: 'line', component: Checkline} ,
  { path: '/steps', name: 'steps', component: StepsPage },
  { path: '/dashboard', name: 'dashboard', component: DashboardPage },
  { path: '/user', name: 'user', component: UserPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router