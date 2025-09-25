<template>

    <img src="@/assets/StarCatLOGO.png" alt="Logo" class="w-30 h-30 mx-auto mt-5"/>

    <div class="text-l text-center font-bold mt-3 mb-3 text-[#DD0186]">
        <h1>User Details</h1>
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

import { ref } from 'vue'
import { useRoute } from 'vue-router'

    const route = useRoute()

    const firstname = ref((route.query.firstname as string) || '')
    const lastname = ref((route.query.lastname as string) || '')
    const password = ref((route.query.password as string) || '')
    const date = ref((route.query.date as string) || '')

</script>

<style scoped>


</style>