<template>
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <p v-if="loading">กำลังตรวจสอบข้อมูล...</p>
    <p v-else-if="!isLine">กรุณาเข้าใช้งานผ่าน LINE เท่านั้น</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import liff from "@line/liff";

const loading = ref(true);
const isLine = ref(false);

onMounted(async () => {
  try {
    // ตรวจสอบว่ารันใน LINE หรือไม่
    if (!liff.isInClient()) {
      loading.value = false;
      isLine.value = false;
      return;
    }

    // เริ่มต้น LIFF
    await liff.init({ liffId: "2008284940-aZ5dYpXy" });
    const profile = await liff.getProfile();
    console.log("LINE Profile:", profile);

    // ถ้าเข้าผ่าน LINE จริง ก็สามารถ redirect ต่อไปหน้า main ได้
    window.location.href = router.push({ name: 'home' });
  } catch (err) {
    console.error("LIFF Error:", err);
    loading.value = false;
    isLine.value = false;
  }
});
</script>
