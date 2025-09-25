<template>

  <van-nav-bar 
    title="STARCAT ★" 
    :style="{ backgroundColor: '#FFCFF2'}"
  >
  </van-nav-bar>

  <van-notice-bar
    text="luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma"
    left-icon="volume-o"
  />

  <router-view /> 

  <van-tabbar 
    v-model="active"  
    :style="{ backgroundColor: '#FFCFF2', }"
    active-color="#FE26C7"
    inactive-color="#FE47D0"
    route
  >
    <van-tabbar-item to="/home" name="home" icon="home-o">Home</van-tabbar-item>
    <van-tabbar-item to="/steps" name="steps" icon="todo-list-o">Progress Steps</van-tabbar-item>
    <van-tabbar-item to="/dashboard" name="dashboard" icon="chart-trending-o">Dashboard</van-tabbar-item>
    <van-tabbar-item to="/user" name="user" icon="user-o">User Details</van-tabbar-item>
  </van-tabbar>

</template>

<script lang="ts" setup>

import { ref } from 'vue'
import { Locale } from 'vant';
import thTH from 'vant/es/locale/lang/th-TH';

Locale.use('th-TH', thTH);

const active = ref('home')

</script>

<style>

body {
background-color: #faedf5;
}

.van-nav-bar__title {
color: #FE47D0 !important;
font-weight: bold;
}

.van-nav-bar__text,
.van-nav-bar__arrow {
color: #FE47D0 !important;
}

.van-notice-bar {
    background-color: #FFFFFF !important;
    color : #FE47D0 !important; 
} 
</style>