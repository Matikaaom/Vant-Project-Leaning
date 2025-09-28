<template>
  <div class="page-container">

    <!-- Header -->
    <div class="header">
      <!-- NavBar -->
      <van-nav-bar 
        title="STARCAT ★" 
        :style="{ backgroundColor: '#FFCFF2'}"
      >
        <template #left>
          <!-- ปุ่ม burger -->
          <div class="burger-btn" v-if="isLargeScreen" @click="toggleSidebar">☰</div>
        </template>
      </van-nav-bar>

      <!-- Notice Bar -->
      <van-notice-bar
        text="luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma"
        left-icon="volume-o"
      />
    </div>

    <!-- Desktop layout -->
    <div v-if="isLargeScreen && showSidebarOrTabbar" class="layout">
      <!-- Sidebar -->
      <transition name="slide">
        <div v-show="isSidebarOpen" class="sidebar">
          <van-sidebar v-model="active" :style="{ '--van-sidebar-width': '200px', '--van-sidebar-selected-border-color': '#FE26C7' }">
            <van-sidebar-item
              title="Home"
              to="/home"
              :style="{ backgroundColor: '#FFCFF2', color: '#FE26C7' }"
            />
            <van-sidebar-item
              title="Progress Steps"
              to="/steps"
              :style="{ backgroundColor: '#FFCFF2', color: '#FE26C7' }"
            />
            <van-sidebar-item
              title="Dashboard"
              to="/dashboard"
              :style="{ backgroundColor: '#FFCFF2', color: '#FE26C7' }"
            />
            <van-sidebar-item
              title="User Details"
              to="/user"
              :style="{ backgroundColor: '#FFCFF2', color: '#FE26C7' }"
            />
          </van-sidebar>
        </div>
      </transition>

      <!-- Main content -->
      <div class="main-content scroll-content">
        <router-view />
      </div>
    </div>

    <!-- Mobile layout -->
    <div v-else class="main-content scroll-content">
      <router-view />
    </div>

    <!-- Mobile Tabbar -->
    <van-tabbar 
      v-if="!isLargeScreen && showSidebarOrTabbar"
      v-model="active"  
      :style="{ backgroundColor: '#FFCFF2' }"
      active-color="#FE26C7"
      inactive-color="#FE47D0"
      route
    >
      <van-tabbar-item to="/home" name="home" icon="home-o">Home</van-tabbar-item>
      <van-tabbar-item to="/steps" name="steps" icon="todo-list-o">Progress Steps</van-tabbar-item>
      <van-tabbar-item to="/dashboard" name="dashboard" icon="chart-trending-o">Dashboard</van-tabbar-item>
      <van-tabbar-item to="/user" name="user" icon="user-o">User Details</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Locale } from 'vant'
import { useRoute } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
import thTH from 'vant/es/locale/lang/th-TH'

Locale.use('th-TH', thTH)

const active = ref('home')
const isSidebarOpen = ref(true) // เริ่มแรกเปิดไว้

// toggle sidebar
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

// ใช้ VueUse 
const { width } = useWindowSize()
const isLargeScreen = computed(() => width.value > 768)

// ตรวจสอบ path ปัจจุบัน 
const route = useRoute()
const showSidebarOrTabbar = computed(() => route.path !== '/')
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden; /* ปิด scroll ของ body */
  background-color: #faedf5;
}

#app, .page-container {
  height: 100%; 
  display: flex;
  flex-direction: column;
}

/* Header (Nav + Notice) */
.header {
  flex-shrink: 0; /* ไม่ให้ถูกบีบ */
}

/* Layout flex sidebar */
.layout {
  flex: 1;
  display: flex;
  align-items: stretch;
  overflow: hidden; 
}

.sidebar {
  display: flex;
  background-color: #FFCFF2;
  height: 100%; 
}

.main-content {
  flex: 1;
  min-height: 0; /* ป้องกัน scroll พัง */
  overflow-y: auto; 
  padding-bottom: 20px; 
}

/* Burger button */
.burger-btn {
  font-size: 22px;
  cursor: pointer;
  color: #FE26C7;
  padding: 0 10px;
  user-select: none;
}

/* Slide transition */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}

/* Custom Vant */
.van-nav-bar__title {
  color: #FE47D0 !important;
  font-weight: bold;
}
.van-nav-bar__text,
.van-nav-bar__arrow {
  color: #FE47D0 !important;
}
.van-notice-bar {
  background-color: #FFFFFF !important;
  color: #FE47D0 !important; 
}
</style>
