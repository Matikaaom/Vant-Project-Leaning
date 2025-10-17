<template>
  <div v-if="!loading && !isInLine" class="flex flex-col items-center justify-center text-center p-6 mt-20">
    <img src="@/assets/StarCatLOGO.png" alt="Logo" class="w-24 h-24 mb-4" />
    <h1 class="text-xl font-semibold mb-2">กรุณาเปิดผ่านแอป LINE</h1>
    <p class="text-gray-500 mb-4">หรือ ล็อกอินด้วย LINE ที่ปุ่มด้านล่าง</p>
    <van-row justify="center">
      <van-button @click="handleLogin" color="#FF5BC6" size="normal">LOGIN LINE</van-button>
    </van-row>
  </div>
  <div v-else-if="loading" class="flex items-center justify-center h-screen">
    <p>กำลังโหลด...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import liff from '@line/liff'
import { useRouter } from 'vue-router'

const router = useRouter()
const LIFF_ID = '2008284940-aZ5dYpXy'
const isInLine = ref(true)
const loading = ref(true)

onMounted(async () => {
  try {
    await liff.init({ liffId: LIFF_ID })
    
    // **A. ล้าง code/state ออกจาก URL ทันที** (ทำซ้ำอีกครั้งใน main.js ก็ไม่เป็นไร)
    const hasCode = window.location.search.includes('code=')
    if (hasCode) {
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    // **B. ถ้าไม่ได้เปิดใน LINE Client**
    if (!liff.isInClient()) {
      // แสดงหน้า Login ผ่าน Browser
      isInLine.value = false
      return
    }

    // **C. ถ้าเปิดใน LINE Client (อยู่ใน LIFF Browser)**

    // **C1. ถ้า Login แล้ว**
    if (liff.isLoggedIn()) {
      const profile = await liff.getProfile()
      console.log('LINE Profile (LineView):', profile)
      // **เปลี่ยนไปหน้า Home ทันทีเพื่อป้องกันการวนลูป เมื่อมีการกด Back Button**
      router.replace({ name: 'home' }) 
      return
    }

    // **C2. ถ้ายังไม่ได้ Login และยังไม่มี code**
    // (main.js ควรจะจัดการส่วนนี้แล้ว แต่ใส่ไว้เพื่อความมั่นใจ)
    if (!hasCode) {
      // ถ้าไม่มีโค้ด (ยังไม่เคยไป Login) ให้เรียก Login
      liff.login({ redirectUri: window.location.origin + '/' })
      return
    }
    
    // **C3. ถ้ามี code แต่ยังไม่ isLoggedIn()**
    // (รอ LIFF SDK ประมวลผลต่อใน main.js, ไม่ทำอะไร)
    
  } catch (error) {
    console.error('เกิดข้อผิดพลาดตอน init LIFF:', error)
    // หากเกิด Error ให้แสดงปุ่ม Login เผื่อไว้
    isInLine.value = false
  } finally {
    loading.value = false
  }
})

function handleLogin() {
  try {
    // ปุ่มนี้สำหรับผู้ที่ไม่ได้อยู่ใน LINE client กด Login ด้วย Browser
    liff.login({ redirectUri: window.location.origin + '/' })
  } catch (err) {
    console.error('Login error:', err)
  }
}
</script>

<style scoped>
.mt-20 { margin-top: 5rem; }
</style>