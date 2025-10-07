<template>

    <!-- Notice Bar -->
    <van-notice-bar
      text="luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma"
      left-icon="volume-o"
    />

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
            color="#FF5BC6"
            :count="6"
            :style="{ '--van-rate-icon-size': '40px' }"
        />
    </div>
    
    <van-cell-group inset >
        <!-- <van-field
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
        /> -->
        <van-field
            v-model="username"
            name="username"
            label="Username"
            disabled
        />
        <van-field
            v-model="password"
            name="password"
            label="Password"
            disabled
        />
        <!-- <van-field
            v-model="date"
            name="date"
            label="Date"
            disabled
        /> -->
    </van-cell-group>

    <div class="p-4">
        <van-grid :column-num="3">
            <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="Text" />
        </van-grid>
    </div>

        <div class="px-4">
            <van-row justify="center">
                <van-button color="#FF5BC6" size="normal" @click="logout">Logout</van-button>
            </van-row>
        </div>

</template>

<script lang="ts" setup>

    import { ref, onMounted } from 'vue'
    import { showConfirmDialog  } from 'vant'
    import { useRoute, useRouter } from 'vue-router'

    const router = useRouter()

    const route = useRoute()

    const firstname = ref('')
    const lastname = ref('')
    const password = ref('')
    const username = ref('')
    const date = ref('')

    const value = ref(3);

    // Logout dialog
    const logout = () => {
        showConfirmDialog({
            title: ' LOGOUT ',
            message: 'Are you sure you want to logout?', 
        })
        .then(() => {
            router.push('/') 
            console.log('user logged out')
        })
        .catch(() => {
            console.log('user cancel logout')
        })
    }

    onMounted(() => {
    // ถ้ามี query มากับ route → เก็บลง localStorage
    if (route.query.firstname) {
            localStorage.setItem('firstname', route.query.firstname as string)
            localStorage.setItem('lastname', route.query.lastname as string)
            localStorage.setItem('password', route.query.password as string)
            localStorage.setItem('date', route.query.date as string)
        }

    if (route.query.username){
        localStorage.setItem('username', route.query.username as string)
        localStorage.setItem('password', route.query.password as string)
        }

        // ดึงจาก localStorage มาแสดง
        firstname.value = localStorage.getItem('firstname') || ''
        lastname.value = localStorage.getItem('lastname') || ''
        username.value = localStorage.getItem('username') || ''
        password.value = localStorage.getItem('password') || ''
        date.value = localStorage.getItem('date') || ''
    })

    

</script>

<style>

:root:root {
    --van-dialog-confirm-button-text-color: #f533a7;
    /* --van-dialog-has-title-message-text-color: #f533a7; */
}

/* .van-dialog__header {
  color: #f533a7; 
} */

</style>
