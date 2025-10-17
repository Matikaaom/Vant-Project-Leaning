<template>
  <div
    v-if="!isInLine"
    class="flex flex-col items-center justify-center text-center p-6 mt-20"
  >
    <img src="@/assets/StarCatLOGO.png" alt="Logo" class="w-24 h-24 mb-4" />
    <h1 class="text-xl font-semibold mb-2">กรุณาเปิดผ่านแอป LINE</h1>
    <p class="text-gray-500 mb-4">
      หรือ ล็อกอินด้วย LINE ที่ปุ่มด้านล่าง
    </p>
    <van-row justify="center">
      <van-button
        @click="handleLogin"
        color="#FF5BC6" size="normal" 
      >
        LOGIN LINE
      </van-button>
    </van-row>
  </div>
  <div v-else-if="loading" class="text-center mt-20">
    <p>กำลังตรวจสอบข้อมูลจาก LINE...</p>
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

    if (!liff.isInClient()) {
      isInLine.value = false
      loading.value = false
      return
    }

    if (!liff.isLoggedIn()) {
      loading.value = false
      return
    }

    const profile = await liff.getProfile()
    console.log('LINE Profile:', profile)

    router.push('/') 
  } catch (error) {
    console.error('เกิดข้อผิดพลาดตอน init LIFF:', error)
    isInLine.value = false
  } finally {
    loading.value = false
  }
})

function handleLogin() {
  try {
    liff.login()
  } catch (err) {
    console.error('Login error:', err)
  }
}
</script>

<style scoped>
.mt-20 {
  margin-top: 5rem;
}
</style>
