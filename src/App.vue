<template>
  <div class="page-container">

    <!-- NavBar -->
    <van-nav-bar 
      title="STARCAT ★" 
      :style="{ backgroundColor: '#FFCFF2'}"
    />

    <!-- Notice Bar -->
    <van-notice-bar
      text="luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma"
      left-icon="volume-o"
    />

    <!-- Desktop layout -->
    <div v-if="isLargeScreen&&showSidebarOrTabbar" class="layout">
      <!-- Sidebar -->
      <van-sidebar v-model="active"  class="bg-[#FFCFF2]">
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
      v-if="!isLargeScreen&&showSidebarOrTabbar"
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
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { Locale } from 'vant';
import { useRoute } from 'vue-router'
import thTH from 'vant/es/locale/lang/th-TH';

Locale.use('th-TH', thTH);

const active = ref('home')
const isLargeScreen = ref(window.innerWidth > 768)

function handleResize() {
  isLargeScreen.value = window.innerWidth > 768
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

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

/* Layout flex sidebar + content */
.layout {
  display: flex;
  height: calc(100vh - 88px); /* ลบความสูง nav + noticebar */
}

.van-sidebar {
  width: 150px; /* กำหนดความกว้าง sidebar */
}

.main-content {
  flex: 1;
  overflow-y: auto; /* scroll เฉพาะ content */
  padding-bottom: 120px; /* กัน tabbar */
}
</style>
