<template>
  <div class="page-container">

    <!-- Header -->
    <div class="header">
      <van-overlay :show="isSidebarOpen"  :style="{ backgroundColor: 'transparent' }"  @click="toggleSidebar"/>
      <!-- NavBar -->
      <van-nav-bar 
        title="STARCAT ★" 
        :style="{ backgroundColor: '#FFCFF2'}"
      >
        <template #left>
          <!-- ปุ่ม burger -->
          <div class="burger-btn" v-if="isLargeScreen && showSidebarOrTabbar" @click="toggleSidebar" >
            <van-icon color="#FE26C7" name="wap-nav" />
          </div>
        </template>
      </van-nav-bar>

    </div>

    <!-- Desktop layout -->
    <div v-if="isLargeScreen && showSidebarOrTabbar" class="layout">
      <!-- Sidebar -->
      <transition name="slide">
        <div v-show="isSidebarOpen" class="sidebar">
          <van-sidebar v-model="active" :style="{ '--van-sidebar-width': '300px', '--van-sidebar-selected-border-color': '#FE26C7', '--van-sidebar-selected-border-height': '60px' }">
            <van-sidebar-item
              title="Home"
              to="/"
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
      <div 
        class="main-content" 
        :class="{ 'content-shifted-desktop': isSidebarOpen }"
      >
        <router-view />
      </div>
    </div>

    <!-- Mobile layout -->
    <div v-else class="main-content">
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
      <van-tabbar-item to="/" name="home" icon="home-o">Home</van-tabbar-item>
      <van-tabbar-item to="/steps" name="steps" icon="todo-list-o">Progress Steps</van-tabbar-item>
      <van-tabbar-item to="/dashboard" name="dashboard" icon="chart-trending-o">Dashboard</van-tabbar-item>
      <van-tabbar-item to="/user" name="user" icon="user-o" badge="2">User Details</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
import liff from '@line/liff';

const router = useRouter()
const LIFF_ID = "2008284940-aZ5dYpXy"

onMounted(async () => {
  try {
    await liff.init({ liffId: LIFF_ID });
    const profile = await liff.getProfile();
    console.log(profile)
    
  } catch (error) {
    console.log('error', error);
    console.error('LIFF initialization failed', error);
  }
  
});

const active = ref('home')
const isSidebarOpen = ref(false)

// toggle sidebar
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}


// ใช้ VueUse 
const { width } = useWindowSize()
const isLargeScreen = computed(() => width.value > 768)

// ตรวจสอบ path ปัจจุบัน 
const route = useRoute()
const showSidebarOrTabbar = computed(() => route.path !== '/line')

</script>

<style>
/* Global styles (Unchanged) */
html, body {
  height: 100%;
  overflow: hidden; 
  background-color: #faedf5;
}

#app, .page-container {
  height: 100%; 
  display: flex;
  flex-direction: column;
}

.header {
  flex-shrink: 0;
}

/* Desktop Layout (Flexbox) */
.layout {
  flex: 1;
  display: flex;
  align-items: stretch;
  overflow: hidden; 
}

.sidebar {
  position: fixed; /* ใช้ fixed กลับมาเพื่อให้ slide transition ทำงานง่าย */
  height: 100%; 
  background-color: #FFCFF2;
  z-index: 1000;
  width: 300px;
}

/* Main Content (Flex Item) */
.main-content {
  flex-grow: 1;
  margin-bottom: 60px; /* เผื่อที่ให้ Tabbar */
  overflow-y: auto; 
  /* KEY FIX: เพิ่ม width ใน transition เพื่อให้การขยับ smooth ทั้ง margin และ width */
  transition: margin-left 0.3s ease, width 0.3s ease; 
}

/* เมื่อ Sidebar เปิดอยู่ (ทำให้ Main Content ขยับ) */
.content-shifted-desktop {
  margin-left: 300px;
  width: calc(100% - 300px); /* ป้องกันการล้นจอ */
}

/* Burger button (Unchanged) */
.burger-btn {
  font-size: 22px;
  cursor: pointer;
  padding: 0 10px;
  user-select: none;
}

/* Slide transition (สำหรับแอนิเมชันของ Sidebar) */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}

/* Custom Vant (Unchanged) */
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