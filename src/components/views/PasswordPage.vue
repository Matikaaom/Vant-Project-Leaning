<template>
    <div class="flex flex-col items-center justify-center text-center p-6 mt-10">
        <img src="@/assets/StarCatLOGO.png" alt="Logo" class="w-30 h-30" />
    </div>

    <div class="text-xl text-center font-bold mb-5 text-[#DD0186]">
        <h1>Enter Password</h1>
    </div>

    <van-password-input
        :value="value"
        :gutter="10"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
    />
    <van-number-keyboard
        v-model="value"
        :show="showKeyboard"
        @blur="showKeyboard = false"
    />
</template>

<script setup>
import { ref } from 'vue';
  
const value = ref('');
const showKeyboard = ref(true);

</script>

<style>
    :root:root{
        --van-password-input-dot-color: #f533a7;
    }
</style>