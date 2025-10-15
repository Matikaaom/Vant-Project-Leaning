<template>

    <!-- Notice Bar -->
    <van-notice-bar
      text="luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma"
      left-icon="volume-o"
    />

    <!-- <img src="@/assets/StarCatLOGO.png" alt="Logo" class="w-30 h-30 mx-auto mt-5"/> -->
    <img id="pictureUrl" v-if="profileUser?.pictureUrl" :src="profileUser.pictureUrl" alt="Profile" class="w-35 h-35 mt-10 rounded-full mx-auto"/>

    <div class="text-l text-center font-bold mt-3 text-[#DD0186]">
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

    <van-form>
        <van-cell-group inset>
            <van-field
                v-model="username"
                name="Username"
                label="Username"
                class="custom-field"
                placeholder="Username"
                :rules="[{ required: true, message: 'Username is required' }]"
            />
            <van-field
                v-model="firstname"
                name="Firstname"
                label="Firstname"
                placeholder="Firstname"
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
                v-model="genderDisplay"
                is-link
                readonly
                label="Gender"
                placeholder="Select Gender"
                @click="showgender = true"
                :rules="[{ required: true, message: 'Gender is required' }]"
            />
            <van-action-sheet
                v-model:show="showgender"
                :actions="actions"
                @select="onSelect"
            />

            <van-field
                v-model="showdate"
                is-link
                readonly
                name="birthDate"
                label="Date of Birth"
                placeholder="Select Date"
                @click="showPicker = true"
                :rules="[{ required: true, message: 'Date is required' }]"
            />
            <van-popup v-model:show="showPicker" destroy-on-close position="bottom">
            <van-date-picker
                :model-value="pickerValue"
                @confirm="onConfirm"
                @cancel="showPicker = false"
            />
            </van-popup>

             <van-field
                v-model="telnum" readonly clickable @touchstart.stop="showtelnum = true" placeholder="Telephone Number">
            >
                <template #left-icon>
                <van-icon class="ml-5 mr-14" name="phone-o" />
                </template>
            </van-field>
            <van-number-keyboard
                v-model="telnum"
                :show="showtelnum"
                @blur="showtelnum = false"
                :maxlength="10"
            />
        
        </van-cell-group>
          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit" @click="onSubmit">
            ยืนยัน
            </van-button>
        </div>
    </van-form>
    
    <!-- <van-cell-group inset >
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
        <van-field
            v-model="date"
            name="date"
            label="Date"
            disabled
        />
    </van-cell-group> -->

    <div class="p-4">
        <van-grid :column-num="3">
            <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="Text" />
        </van-grid>
    </div>

    <div class="px-4 mb-3">
        <van-row justify="center">
            <van-button color="#FF5BC6" size="normal" @click="logout">Logout</van-button>
        </van-row>
    </div>

</template>

<script lang="ts" setup>

    import { ref, onMounted, computed } from 'vue'
    import { showConfirmDialog, showNotify } from 'vant'
    import { useRoute, useRouter } from 'vue-router'
    import liff from '@line/liff'
    import { color } from 'echarts'
    import { StorageSerializers, useStorage } from "@vueuse/core"
    const profileUser = useStorage("profileUser", null, undefined, { serializer: StorageSerializers.object })
    
    onMounted(async () => {
        await liff.init({ liffId: '2008284940-aZ5dYpXy' })

        const profile = await liff.getProfile()
        profileUser.value = {
            userId: profile.userId,
            displayName: profile.displayName,
            pictureUrl: profile.pictureUrl,
            statusMessage: profile.statusMessage,
        }

        username.value = profile.displayName
        })

    const router = useRouter()

    const route = useRoute()

    const value = ref(3);

    const firstname = ref('')
    const lastname = ref('')
    const password = ref('')
    const username = ref('')
    const date = ref('')

    const telnum = ref('')
    const showtelnum = ref(false)

    const gender = ref('')
    const showgender = ref(false);
    const actions = [
        { name: 'Male', color: '#FE47D0' },
        { name: 'Female', color: '#FE47D0' },
        { name: 'Other', color: '#FE47D0' },
    ]

    const showdate = ref('')
    const showPicker = ref(false);
    const pickerValue = ref<string[]>([]);
    const onConfirm = ({ selectedValues }: { selectedValues: string[] }) => {
        showdate.value = selectedValues.join('/');
        pickerValue.value = selectedValues;
        showPicker.value = false;
    };

    // ค่าที่แสดงใน field (ถ้ายังไม่เลือกให้โชว์ข้อความเริ่มต้น)
    const genderDisplay = computed({
        get: () => gender.value ,
        set: () => {} // ทำให้ไม่ error เวลาใช้ v-model กับ readonly
    })

    const onSelect = (action) => {
        gender.value = action.name
        showgender.value = false // ปิด ActionSheet หลังเลือก
    }

    const onSubmit = () => {
        showConfirmDialog({
            title: 'Confirmation',
            message: 'Are you sure you want to edit?', 
        })
        .then(() => {
            showNotify({ background: '#FF5BC6', message: 'แก้ไขเรียบร้อย' });
            const formData = {
                username: username.value,
                firstname: firstname.value,
                lastname: lastname.value,
                gender: gender.value,
                showdate: showdate.value,
                telnum: telnum.value,
                // date: date.value
            }

        // อัปเดต localStorage ทันที
        localStorage.setItem('username', formData.username)
        localStorage.setItem('firstname', formData.firstname)
        localStorage.setItem('lastname', formData.lastname)
        localStorage.setItem('gender', formData.gender)
        localStorage.setItem('showdate', formData.showdate)
        localStorage.setItem('telnum', formData.telnum)})
        // localStorage.setItem('password', formData.password)

        .catch(() => {
            console.log('user cancel edit')
        })

    }

    // Logout dialog
    const logout = () => {
        showConfirmDialog({
            title: ' LOGOUT ',
            message: 'Are you sure you want to logout?', 
        })
        .then(() => {
            liff.logout()
            liff.login()
            // window.location.reload()
            // router.push('/') 
            // console.log('user logged out')
        })
        .catch((error) => {
            console.error('LIFF logout failed', error);
            console.log('user cancel logout')
        })
    }

    onMounted(() => {

    // if (route.query.username){
    //     localStorage.setItem('username', route.query.username as string)
    //     localStorage.setItem('password', route.query.password as string)
    //     localStorage.setItem('firstname', route.query.firstname as string)
    //     localStorage.setItem('lastname', route.query.lastname as string)
    //     localStorage.setItem('showdate', route.query.showdate as string)
    //     localStorage.setItem('gender', route.query.gender as string)
    //     localStorage.setItem('telnum', route.query.telnum as string)
    // }

    // ดึงจาก localStorage มาแสดง
        username.value = localStorage.getItem('username') || ''
        password.value = localStorage.getItem('password') || ''
        firstname.value = localStorage.getItem('firstname') || ''
        lastname.value = localStorage.getItem('lastname') || ''
        showdate.value = localStorage.getItem('showdate') || ''
        gender.value = localStorage.getItem('gender') || ''
        telnum.value = localStorage.getItem('telnum') || ''
    })

</script>

<style>

:root:root {
    --van-dialog-confirm-button-text-color: #f533a7;
    --van-picker-confirm-action-color: #f533a7;
    --van-picker-option-text-color: #f533a7;
    --van-action-sheet-item-background: #FFCFF2;
    /* --van-dialog-has-title-message-text-color: #f533a7; */
}

/* .van-dialog__header {
  color: #f533a7; 
} */

</style>
