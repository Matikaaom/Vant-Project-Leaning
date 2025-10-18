<template>
  <!-- หน้าแจ้งเตือนถ้าไม่ใช่ LINE Client หรือยังไม่ได้ login -->
  <div v-if="!isInLine" class="flex flex-col items-center justify-center text-center p-6 mt-20">
    <img src="@/assets/StarCatLOGO.png" alt="Logo" class="w-24 h-24 mb-4" />
    <h1 class="text-xl font-semibold mb-2">กรุณาเปิดผ่าน LINE OA</h1>
    <p class="text-gray-500 mb-4">หรือ ล็อกอินด้วย LINE ที่ปุ่มด้านล่าง</p>
    <p class="text-gray-500 mb-4">{{ isInClient ? "มาจากไลน์" : "ไม่ได้มาจากไลน์" }}</p>
    <van-row justify="center">
      <van-button @click="handleLogin" color="#FF5BC6" size="normal">LOGIN LINE</van-button>
    </van-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import liff from '@line/liff'
import { useRouter } from 'vue-router'

// 🔹 ใช้ useStorage เก็บ profileUser แบบ persistent (ย้ายมาจาก main.ts)
import { useStorage, StorageSerializers } from '@vueuse/core'

const router = useRouter()
const LIFF_ID = '2008284940-aZ5dYpXy'

// 🔹 ตัวแปรสำคัญที่จำเป็น
const isInLine = ref(true)        // ตรวจสอบว่าเปิดใน LINE หรือไม่
const isInClient = ref(false)     // ตรวจสอบว่าเป็น LINE Client
const profileUser = useStorage('profileUser', null, undefined, {
  serializer: StorageSerializers.object
})

// 🔹 ฟังก์ชัน LOGIN LINE (ย้ายมาจาก main.ts)
function handleLogin() {
  try {
    liff.login({ redirectUri: window.location.origin + '/' })
  } catch (err) {
    console.error('Login error:', err)
  }
}

// 🔹 onMounted: ตรวจสอบ LIFF, login, ดึง profile และ redirect (ย้ายมาจาก main.ts)
onMounted(async () => {
  try {
    await liff.init({ liffId: LIFF_ID })
    isInClient.value = liff.isInClient()

    const hasCode = window.location.search.includes('code=')
    if (hasCode) {
      // ✅ ล้าง code หลัง login สำเร็จ
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    // ถ้าไม่ใช่ LINE Client และยังไม่ได้ login → แสดงหน้าแจ้ง
    if (!liff.isInClient() && !liff.isLoggedIn()) {
      isInLine.value = false
      return
    }

    // ถ้า login แล้ว → ดึง profile
    if (liff.isLoggedIn()) {
      const profile = await liff.getProfile()
      console.log('LINE Profile:', profile)

      profileUser.value = {
        userId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
        statusMessage: profile.statusMessage
      }

      // 🔹 redirect ไปหน้า home หลัง login
      router.replace({ name: 'home' })
    }
  } catch (error) {
    console.error('เกิดข้อผิดพลาดตอน init LIFF:', error)
    isInLine.value = false
  }
})
</script>

<style scoped>
.mt-20 { margin-top: 5rem; }
</style>
