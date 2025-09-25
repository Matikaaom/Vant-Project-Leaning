<!-- <template>
    <van-nav-bar 
        title="STARCAT ★" 
        left-text="Back" 
        left-arrow
        :style="{ backgroundColor: '#FFCFF2'}"
        @click-left="onClickLeft"
        >
    </van-nav-bar>
    

    <van-notice-bar
        text="luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma"
        left-icon="volume-o"
    />

<h1>ddddd</h1>

    
</template>

<script setup>

import { ref, computed } from 'vue';
import { NavBar,
    Tab, 
    Tabs, 
    Tabbar, 
    TabbarItem, 
    Space, 
    Search, 
    NoticeBar, 
    Circle, 
    TimePicker, 
    Swipe, 
    SwipeItem, 
    Form, 
    Field, 
    CellGroup, 
    AddressEdit, 
    showToast, 
    Area 
} from 'vant';

const active = ref('register');


</script>

<style>



</style> -->

<template>
    <div class="page-container">
        <div class="scroll-area">
            <van-tabs v-model:active="activeName" color="#FE47D0" background="#FFCFF2" title-active-color="#FE26C7">
                <van-tab title="Sign Up" name="signup">
                    <img src="@/assets/StarCatLOGO.png" alt="Logo" class="w-30 h-30 mx-auto mt-5"/>
                    <div class="text-l text-center font-bold mt-3 mb-3 text-[#FE47D0]">
                        <h1>Create an Account</h1>
                    </div>
                    <van-form @submit="onSubmit">
                        <van-cell-group inset>
                            <van-field
                                v-model="firstname"
                                name="firstname"
                                label="Firstname"
                                placeholder="Firstname"
                                class="custom-field"
                                :rules="[{ required: true, message: 'Firstname is required' }]"
                            />
                            <van-field
                                v-model="lastname"
                                name="lastname"
                                label="Lastname"
                                placeholder="Lastname"
                                :rules="[{ required: true, message: 'Lastname is required' }]"
                            />
                            <van-field
                                v-model="password"
                                type="password"
                                name="password"
                                label="Password"
                                placeholder="Password"
                                :rules="[{ required: true, message: 'Password is required' }]"
                            />
                        <van-field
                                v-model="date"
                                name="date"
                                label="Date"
                                placeholder="Select Date Range"
                                readonly 
                                clickable
                                is-link
                                :rules="[{ required: true, message: 'Date is required' }]"
                                @click="show = true"
                            />
                            <van-calendar
                                v-model:show="show"
                                type="range"
                                color="#FE47D0"
                                @confirm="onConfirm"                               
                            />

                        </van-cell-group>

                        <div style="margin: 16px; ">
                        <van-button color="#FE47D0" round block type="primary" native-type="submit">
                            Sign Up
                        </van-button>
                        </div>
                    </van-form>
                </van-tab>
                <van-tab title="Log In" name="login">
                    <img src="@/assets/StarCatLOGO.png" alt="Logo" class="w-30 h-30 mx-auto mt-5"/>
                    <div class="text-l text-center font-bold mt-3 mb-3 text-[#FE47D0]">
                        <h1>Log In to Journey</h1>
                    </div>
                    <van-form @submit="onSubmit">
                        <van-cell-group inset>
                            <van-field
                                v-model="firstname"
                                name="firstname"
                                label="Firstname"
                                placeholder="Firstname"
                                class="custom-field"
                                :rules="[{ required: true, message: 'Firstname is required' }]"
                            />
                            <van-field
                                v-model="lastname"
                                name="lastname"
                                label="Lastname"
                                placeholder="Lastname"
                                :rules="[{ required: true, message: 'Lastname is required' }]"
                            />
                            <van-field
                                v-model="password"
                                type="password"
                                name="password"
                                label="Password"
                                placeholder="Password"
                                :rules="[{ required: true, message: 'Password is required' }]"
                            />
                        <van-field
                                v-model="date"
                                name="date"
                                label="Date"
                                placeholder="Select Date Range"
                                readonly 
                                clickable
                                is-link
                                :rules="[{ required: true, message: 'Date is required' }]"
                                @click="show = true"
                            />
                            <van-calendar
                                v-model:show="show"
                                type="range"
                                color="#FE47D0"
                                @confirm="onConfirm"
                            />

                        </van-cell-group>

                        <div style="margin: 16px; ">
                        <van-button color="#FE47D0" round block type="primary" native-type="submit">
                            Log In
                        </van-button>
                        </div>
                    </van-form>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

import { useRouter } from 'vue-router'


    const router = useRouter()

    const activeName = ref('signup');

    const firstname = ref('');
    const lastname = ref('');
    const password = ref('');

    const date = ref('');
    const show = ref(false);

    const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
    const onConfirm = (values) => {
      const [start, end] = values;
      show.value = false;
      date.value = `${formatDate(start)} - ${formatDate(end)}`;
    };

    const onSubmit = () => {
        const formData = {
            firstname: firstname.value,
            lastname: lastname.value,
            password: password.value,
            date: date.value
        }

        console.log('submit', formData)

        router.push({ 
            name: 'user',
            query: formData   
        })
    };

</script>

<style scoped>

</style>
