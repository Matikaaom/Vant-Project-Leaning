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

    <!-- <div class="flex justify-center mb-3">
        <van-count-down
            ref="countDown"
            millisecond
            :time="10000"
            :auto-start="false"
            format="ss:SS"
            @finish="onFinish"
        />
    </div>
    <van-grid clickable :column-num="3">
        <van-grid-item text="Start" icon="play-circle-o" @click="start" />
        <van-grid-item text="Pause" icon="pause-circle-o" @click="pause" />
        <van-grid-item text="Reset" icon="replay" @click="reset" />
    </van-grid> -->

    <!-- <van-grid :gutter="10">
    <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="Text" />
    </van-grid> -->
    
</template>

<script lang="ts" setup>
import { ref} from 'vue'
import { showToast } from 'vant';
import Dashboard from '@/components/echart/Dashboard.vue'
import { BORDER_BOTTOM } from 'vant/lib/utils';

    const image = ref('');
    const onSubmit = (data) => {
        image.value = data.image;
        };
    const onClear = () => showToast('clear');

// const countDown = ref(null);

//     const start = () => {
//       countDown.value.start();
//     };
//     const pause = () => {
//       countDown.value.pause();
//     };
//     const reset = () => {
//       countDown.value.reset();
//     };
//     const onFinish = () => showToast('Finished');


</script>

<style>

:root:root {
  --van-button-primary-background: #FE47D0;  /* สีพื้นหลังปุ่ม confirm */
  --van-button-primary-border-color: #FE47D0;
}

</style>
