<template>
  <div v-if="!isInLine" class="flex flex-col items-center justify-center text-center p-6 mt-20">
    <img src="@/assets/StarCatLOGO.png" alt="Logo" class="w-24 h-24 mb-4" />
    <h1 class="text-xl font-semibold mb-2">กรุณาเปิดผ่าน LINE OA</h1>
    <p class="text-gray-500 mb-4">หรือ ล็อกอินด้วย LINE ที่ปุ่มด้านล่าง</p>
    <van-row justify="center">
      <van-button @click="handleLogin" color="#FF5BC6" size="normal">LOGIN LINE</van-button>
    </van-row>
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
    // ถ้ามี code มาจาก LINE OAuth ให้ล้าง query เพื่อไม่ให้วนซ้ำ
    const hasCode = window.location.search.includes('code=')
    if (hasCode) {
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    // ถ้าไม่ใช่ LINE client ให้แสดงหน้าบอกให้เปิดในแอป LINE
    if (!liff.isInClient()) {
      isInLine.value = false
      loading.value = false
      return
    }

    // ถ้าอยู่ใน LINE client แต่ยังไม่ได้ login และไม่มี code ให้เรียก login (redirect กลับไป root)
    if (!liff.isLoggedIn()) {
      if (!hasCode) {
        liff.login({ redirectUri: window.location.origin + '/' })
        return
      }
      // ถ้ามี code อยู่ ให้รอให้ LIFF SDK ประมวลผล (อย่าเรียก login ซ้ำ)
      loading.value = false
      return
    }

    // ถ้า login แล้ว ดึง profile แล้วไปหน้า home (root)
    const profile = await liff.getProfile()
    console.log('LINE Profile:', profile)
    router.replace({ name: 'home' })
  } catch (error) {
    console.error('เกิดข้อผิดพลาดตอน init LIFF:', error)
    isInLine.value = false
  } finally {
    loading.value = false
  }
})

function handleLogin() {
  try {
    liff.login({ redirectUri: window.location.origin + '/' })
  } catch (err) {
    console.error('Login error:', err)
  }
}
</script>

<style scoped>
.mt-20 { margin-top: 5rem; }
</style>
