<template>
    
    <!-- Notice Bar -->
    <van-notice-bar
      text="luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma"
      left-icon="volume-o"
    />
    
    <div class="text-l font-bold ml-5 mt-3 mb-3 text-[#DD0186]">
        <h1>Dashboard</h1>
    </div>

    <Dashboard/>

    <div class="text-l font-bold text-[#FE47D0]">
        <van-divider 
        content-position="left"
        :style="{ color: '#DD0186', borderColor: '#DD0186', padding: '0 16px' }"
        >
        Signature
        </van-divider>
    </div>

    <van-signature 
        confirm-button-text="Confirm"
        clear-button-text="Clear" 
        background-color="#FFCFF2" 
        pen-color="#FE47D0" 
        @submit="onSubmit" 
        @clear="onClear" 
      
    />
    <van-image v-if="image" :src="image" :style="{ padding: '10px', marginBottom: '10px' }" />

    
</template>

<script lang="ts" setup>
import { ref} from 'vue'
import { showToast } from 'vant';
import Dashboard from '@/components/echart/Dashboard.vue'

    const image = ref('');
    const onSubmit = (data) => {
        image.value = data.image;
        };
    const onClear = () => showToast('clear');

</script>

<style>

:root:root {
  --van-button-primary-background: #FE47D0;  
  --van-button-primary-border-color: #FE47D0;
}

</style>
