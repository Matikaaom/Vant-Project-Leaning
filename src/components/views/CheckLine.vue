<!-- <template>
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

// เพิ่ม import สำหรับ useStorage (จาก VueUse)
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
    const hasCode = window.location.search.includes('code=')
    if (hasCode) {
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    isInClient.value = liff.isInClient()

    if (!liff.isInClient() && !liff.isLoggedIn()) {
      isInLine.value = false
      loading.value = false
      return
    }

    // ดึงโปรไฟล์ผู้ใช้จาก LINE
    const profile = await liff.getProfile()
    console.log('LINE Profile:', profile)

    // เก็บข้อมูลโปรไฟล์ลง localStorage
    profileUser.value = {
      userId: profile.userId,
      displayName: profile.displayName,
      pictureUrl: profile.pictureUrl,
      statusMessage: profile.statusMessage,
    }

    // เก็บข้อมูลลงตัวแปร reactive สำหรับแสดงในหน้า
    userId.value = profile.userId
    displayName.value = profile.displayName
    statusMessage.value = profile.statusMessage
    pictureUrl.value = profile.pictureUrl

    // ไปหน้า home
    router.replace({ name: 'home' })
    loading.value = false
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
.mt-20 {
  margin-top: 5rem;
}
</style> -->

<template>
  <div v-if="!isInLine" class="flex flex-col items-center justify-center text-center p-6 mt-20">
    <img src="@/assets/StarCatLOGO.png" alt="Logo" class="w-24 h-24 mb-4" />
    <h1 class="text-xl font-semibold mb-2">กรุณาเปิดผ่าน LINE OA</h1>
    <p class="text-gray-500 mb-4">หรือ ล็อกอินด้วย LINE ที่ปุ่มด้านล่าง</p>
    <p class="text-gray-500 mb-4">
      {{ isInClient ? "มาจาก LINE" : "ไม่ได้มาจาก LINE" }}
    </p>
    <van-row justify="center">
      <van-button @click="handleLogin" color="#FF5BC6" size="normal">
        LOGIN LINE
      </van-button>
    </van-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import liff from '@line/liff'
import { useStorage, StorageSerializers } from '@vueuse/core'

const router = useRouter()
const LIFF_ID = '2008284940-aZ5dYpXy'

// State
const isInLine = ref(true)
const isInClient = ref(false)
const loading = ref(true)

// LocalStorage สำหรับเก็บข้อมูลผู้ใช้
const profileUser = useStorage('profileUser', null, undefined, {
  serializer: StorageSerializers.object
})

onMounted(async () => {
  await initLiff()
})

async function initLiff() {
  const hasCode = window.location.search.includes('code=')

  try {
    // --- 1. เริ่มต้น LIFF ---
    await liff.init({ liffId: LIFF_ID })
    console.log('✅ LIFF initialized')

    // --- 2. ตรวจว่าอยู่ใน LINE client หรือเปล่า ---
    isInClient.value = liff.isInClient()
    if (!liff.isInClient()) {
      console.warn('⚠️ เปิดจาก Browser ธรรมดา → ไปหน้า /line')
      isInLine.value = false
      loading.value = false
      return
    }

    // --- 3. ถ้ายังไม่ login ---
    if (!liff.isLoggedIn()) {
      if (hasCode) {
        console.log('⏳ พบ code แล้ว กำลังรอการยืนยัน login...')
        return
      }
      console.log('❌ ยังไม่ login → เรียก liff.login()')
      liff.login({ redirectUri: window.location.origin + '/line' })
      return
    }

    // --- 4. ถ้า login แล้ว ---
    const profile = await liff.getProfile()
    console.log('👤 LINE profile:', profile)

    // --- 5. ล้าง code ออกจาก URL หลังยืนยัน login สำเร็จ ---
    if (hasCode) {
      window.history.replaceState({}, document.title, window.location.pathname)
      console.log('✅ Login confirmed → ล้าง code ออกจาก URL')
    }

    // --- 6. เก็บข้อมูล profile ลง localStorage ---
    profileUser.value = {
      userId: profile.userId,
      displayName: profile.displayName,
      pictureUrl: profile.pictureUrl,
      statusMessage: profile.statusMessage
    }

    // --- 7. Redirect ถ้าอยู่หน้า /line แล้ว login สำเร็จ ---
    if (window.location.pathname === '/line') {
      console.log('🔄 Logged in → redirect ไป /')
      router.replace('/')
    }

  } catch (err) {
    console.error('❌ LIFF init error:', err)
    router.replace('/line')
  } finally {
    loading.value = false
  }
}

// --- กรณีผู้ใช้กดปุ่ม login เอง ---
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

