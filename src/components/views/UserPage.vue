<template>

    <img src="@/assets/StarCatLOGO.png" alt="Logo" class="w-30 h-30 mx-auto mt-5"/>

    <div class="text-l text-center font-bold mt-3 mb-3 text-[#DD0186]">
        <h1>User Details</h1>
    </div>

    <div class="flex justify-center mb-3">
        <van-rate 
            v-model="value" 
            icon="like" 
            void-icon="like-o" 
            class="m-5"
            :count="6"
            :style="{ '--van-rate-icon-size': '40px' }"
        />
    </div>
    
    <van-cell-group inset >
        <van-field
            v-model="firstname"
            name="firstname"
            label="Firstname"
            class="custom-field"
            disabled
        />
        <van-field
            v-model="lastname"
            name="lastname"
            label="Lastname"
            disabled
        />
        <van-field
            v-model="password"
            name="password"
            label="Password"
            disabled
        />
        <van-field
            v-model="date"
            name="date"
            label="Date"
            disabled
        />
    </van-cell-group>

</template>

<script lang="ts" setup>

    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()

    const firstname = ref('')
    const lastname = ref('')
    const password = ref('')
    const date = ref('')

    const value = ref(3);

    onMounted(() => {
    // ถ้ามี query มากับ route → เก็บลง localStorage
    if (route.query.firstname) {
            localStorage.setItem('firstname', route.query.firstname as string)
            localStorage.setItem('lastname', route.query.lastname as string)
            localStorage.setItem('password', route.query.password as string)
            localStorage.setItem('date', route.query.date as string)
        }

        // ดึงจาก localStorage มาแสดง
        firstname.value = localStorage.getItem('firstname') || ''
        lastname.value = localStorage.getItem('lastname') || ''
        password.value = localStorage.getItem('password') || ''
        date.value = localStorage.getItem('date') || ''
    })

</script>

<style scoped>


</style>