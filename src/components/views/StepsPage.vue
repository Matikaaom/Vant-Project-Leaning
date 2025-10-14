<template>

    <!-- Notice Bar -->
    <van-notice-bar
      text="luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma"
      left-icon="volume-o"
    />

    <div class="text-l font-bold ml-5 mt-3 mb-3 text-[#DD0186]">
        <h1>Progress Steps</h1>
    </div>
    <div class="mb-5 p-2">
        <van-steps direction="vertical" :active="4" active-color="#DD0186">
            <van-step>
                <h3>【Step 1】 Submit Application</h3>
                <p>2024-09-21 09:00</p>
            </van-step>

            <van-step>
                <h3>【Step 2】 Document Verification</h3>
                <p>2024-09-21 12:30</p>
            </van-step>

            <van-step>
                <h3>【Step 3】 Initial Review</h3>
                <p>2024-09-22 10:00</p>
            </van-step>

            <van-step>
                <h3>【Step 4】 Approval Decision</h3>
                <p>2024-09-22 15:30</p>
            </van-step>

            <van-step>
                <h3>【Step 5】 Notification</h3>
                <p>2024-09-23 09:00</p>
            </van-step>

            <van-step>
                <h3>【Step 6】 Onboarding / Implementation</h3>
                <p>2024-09-23 13:00</p>
            </van-step>

            <van-step>
                <h3>【Step 7】 Completed</h3>
                <p>2024-09-24 11:30</p>
            </van-step>
        </van-steps>
    </div>

    <div class="text-l font-bold text-[#FE47D0]">
        <van-divider 
        content-position="left"
        :style="{ color: '#DD0186', borderColor: '#DD0186', padding: '0 16px' }"
        >
        Countdown Timer
        </van-divider>
    </div>

    <van-count-down class="text-center mb-5 font-bold"
        ref="countDown"
        millisecond
        :time="60000"
        :auto-start="false"
        format="mm:ss:SS"
        @finish="onFinish"
        color="#DD0186"
    />
    <div class="ml-2 mr-2 mb-5">
        <van-grid clickable :column-num="3">
            <van-grid-item text="Start" icon="play-circle-o" @click="start" />
            <van-grid-item text="Pause" icon="pause-circle-o" @click="pause" />
            <van-grid-item text="Reset" icon="replay" @click="reset" />
        </van-grid>
    </div>

</template>

<script lang="ts" setup> 
import {ref} from 'vue'
import { showToast } from 'vant';

 const countDown = ref(null);

    const start = () => {
      countDown.value.start();
    };
    const pause = () => {
      countDown.value.pause();
    };
    const reset = () => {
      countDown.value.reset();
    };
    const onFinish = () => showToast('Finished');

</script>

<style>
    body{
        color:#DD0186;
    }
    :root:root{
        --van-count-down-text-color: #DD0186;
    }
</style>