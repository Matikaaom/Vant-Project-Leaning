<template>

    <!-- Notice Bar -->
    <van-notice-bar
      text="luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma"
      left-icon="volume-o"
    />

    <div class="text-l font-bold ml-5 mt-3 mb-3 text-[#DD0186]">
        <h1>Progress Steps</h1>
    </div>
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


</template>

<script lang="ts" setup> 

</script>