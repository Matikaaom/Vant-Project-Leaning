<template>
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

<script setup>

import { ref, onMounted } from 'vue'
import liff from '@line/liff'
import { useRouter } from 'vue-router'
import { useStorage, StorageSerializers } from '@vueuse/core'

const router = useRouter()
const LIFF_ID = '2008284940-aZ5dYpXy'

const isInLine = ref(true)
const loading = ref(true)
const isInClient = ref(false)

// เพิ่มส่วนเก็บข้อมูลผู้ใช้แบบถาวร (localStorage)
const profileUser = useStorage('profileUser', null, undefined, {
  serializer: StorageSerializers.object
})

// เพิ่มตัวแปร reactive สำหรับผูกกับ template (ถ้ามีการแสดง)
const userId = ref('')
const displayName = ref('')
const statusMessage = ref('')
const pictureUrl = ref('')

onMounted(async () => {
  try {
    await liff.init({ liffId: LIFF_ID })

    const urlParams = new URLSearchParams(window.location.search)
    const loginSuccess = urlParams.get('login') === 'true' // ใช้ query ?login=true

    isInClient.value = liff.isInClient()

    if (!liff.isInClient() && !liff.isLoggedIn()) {
      isInLine.value = false
      loading.value = false
      return
    }

    const profile = await liff.getProfile()
    profileUser.value = {
      userId: profile.userId,
      displayName: profile.displayName,
      pictureUrl: profile.pictureUrl,
      statusMessage: profile.statusMessage,
    }

    userId.value = profile.userId
    displayName.value = profile.displayName
    statusMessage.value = profile.statusMessage
    pictureUrl.value = profile.pictureUrl

    if (loginSuccess) {
      router.replace({ name: 'home' }) // redirect **เฉพาะหลัง login ใหม่**
    }

  } catch (error) {
    console.error('เกิดข้อผิดพลาดตอน init LIFF:', error)
    isInLine.value = false
  } finally {
    loading.value = false
  }
})


function handleLogin() {
  try {
    liff.login({ redirectUri: window.location.origin + '/line' })
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
