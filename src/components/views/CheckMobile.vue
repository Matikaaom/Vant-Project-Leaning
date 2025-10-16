<!-- <template>
    <div class="flex flex-col items-center justify-center text-center p-6 mt-55">
        <img src="@/assets/StarCatLOGO.png" alt="Logo" class="w-24 h-24 mb-4" />
        <h1 class="text-xl font-semibold mb-2">กรุณาเปิดผ่านแอป LINE</h1>
        <p class="text-gray-500">หน้านี้สามารถใช้งานได้เฉพาะใน LINE เท่านั้น</p>
    </div>
</template> -->

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-[#ffeaf8] text-[#FE26C7]">
    <van-loading type="spinner" color="#FE26C7" size="40px" />
    <p class="mt-3 font-bold">กำลังตรวจสอบการเข้าสู่ระบบ...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import liff from '@line/liff'

const router = useRouter()

onMounted(async () => {
  try {

    if (!liff.isLoggedIn()) {
      liff.login()
      return
    }

    router.replace('/')
  } catch (error) {
    console.error('LIFF init failed', error)
  }
})
</script>
