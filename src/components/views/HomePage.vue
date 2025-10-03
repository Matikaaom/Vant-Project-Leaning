<template>

    <!-- Notice Bar -->
    <van-notice-bar
      text="luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma"
      left-icon="volume-o"
    />

  <div class="text-l font-bold ml-5 mt-3 text-[#DD0186]">
    <h1>News and Announcements</h1>
  </div>

  <!-- <van-search v-model="value" background="#f999de" placeholder="Placeholder" /> -->

  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item>CAT 1</van-swipe-item>
    <van-swipe-item>CAT 2</van-swipe-item>
    <van-swipe-item>CAT 3</van-swipe-item>
    <van-swipe-item>CAT 4</van-swipe-item>
  </van-swipe>

  <div class="text-l font-bold mt-3 mb-3 text-[#FE47D0]">
    <van-divider 
      content-position="left"
      :style="{ color: '#DD0186', borderColor: '#DD0186', padding: '0 16px' }"
    >
      News
    </van-divider>
  </div>

  <van-card
    class="m-3 mt-3 custom-card"
    title="First News"
    desc="Description of the news"
    thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" 
    :style="{ 'background-color': '#f999de' }"
  />
  <van-card
    class="m-3 mt-3 custom-card"
    title="Second News"
    desc="Description of the news"
    thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
    :style="{ 'background-color': '#f999de' }"
  />
  <van-card
    class="m-3 mt-3 custom-card"
    title="Third News"
    desc="Description of the news"
    thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
    :style="{ 'background-color': '#f999de' }"
  />

  <div class="text-l font-bold mt-3 text-[#FE47D0]">
    <van-divider 
      content-position="left"
      :style="{ color: '#DD0186', borderColor: '#DD0186', padding: '0 16px' }"
    >
      Announcements
    </van-divider>
  </div>

  <van-card
    class="m-3 mt-3 custom-card"
    title="First Announcements"
    desc="Description of the Announcements"
    thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
    :style="{ 'background-color': '#f999de' }"
  />
  <van-card
    class="m-3 mt-3 custom-card"
    title="Second Announcements"
    desc="Description of the Announcements"
    thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
    :style="{ 'background-color': '#f999de' }"
  />
  <van-card
    class="m-3 mt-3 mb-10 custom-card"
    title="Third Announcements"
    desc="Description of the Announcements"
    thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
    :style="{ 'background-color': '#f999de' }"
  />

</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value = ref('')

</script>

<style>

  html, body {
    height: 100%;
  }

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 30px;
    line-height: 200px;
    text-align: center;
    margin-top: 15px;
    background-color: #FE47D0;
  }

  .custom-card .van-card__title {
    color: white; /* สี title */
  }

  .custom-card .van-card__desc {
    color: rgb(255, 255, 255); /* สี desc */
  }
    
</style>