<template>

  <!-- Notice Bar -->
  <van-notice-bar
    text="luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma luv ma"
    left-icon="volume-o"
  />

  <!-- 🟢 แสดงรูปโปรไฟล์จาก LINE (ถ้ามี) -->
  <img
    id="pictureUrl"
    v-if="profileUser && profileUser.pictureUrl"
    :src="profileUser.pictureUrl"
    alt="Profile"
    class="w-35 h-35 mt-10 rounded-full mx-auto"
  />

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
        v-model="userId"
        name="User ID"
        label="User ID"
        placeholder="User ID"
        :rules="[{ required: true, message: 'User ID is required' }]"
      />
      <van-field
        v-model="displayName"
        name="Displayname"
        label="Username"
        placeholder="UserName"
        :rules="[{ required: true, message: 'Username is required' }]"
      />
      <van-field
        v-model="statusMessage"
        name="Status"
        label="Status"
        placeholder="Status"
        :rules="[{ required: true, message: 'Status is required' }]"
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
      <van-popup v-model:show="showPicker" destroy-on-close position="bottom" class="mr-5">
        <van-date-picker
          :model-value="pickerValue"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>

      <van-field
        v-model="telnum"
        readonly
        clickable
        @touchstart.stop="showtelnum = true"
        placeholder="Telephone Number"
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

// 🟢 เพิ่ม: ดึงข้อมูลจาก useStorage (profileUser)
import { useStorage, StorageSerializers } from '@vueuse/core'

// 🟢 เพิ่ม: ใช้ useStorage เพื่อเก็บ/อ่าน LINE profile ที่ login ไว้ก่อนหน้า
const profileUser = useStorage('profileUser', null, undefined, {
  serializer: StorageSerializers.object
})

const router = useRouter()
const route = useRoute()

const value = ref(3)
const displayName = ref('')
const statusMessage = ref('')
const password = ref('')
const userId = ref('')
const date = ref('')

const telnum = ref('')
const showtelnum = ref(false)

const gender = ref('')
const showgender = ref(false)
const actions = [
  { name: 'Male', color: '#FE47D0' },
  { name: 'Female', color: '#FE47D0' },
  { name: 'Other', color: '#FE47D0' },
]

const showdate = ref('')
const showPicker = ref(false)
const pickerValue = ref<string[]>([])
const onConfirm = ({ selectedValues }: { selectedValues: string[] }) => {
  showdate.value = selectedValues.join('/')
  pickerValue.value = selectedValues
  showPicker.value = false
}

const genderDisplay = computed({
  get: () => gender.value,
  set: () => {} // เพื่อให้ไม่ error เวลาใช้กับ readonly v-model
})

const onSelect = (action) => {
  gender.value = action.name
  showgender.value = false
}

const onSubmit = () => {
  showConfirmDialog({
    title: 'Confirmation',
    message: 'Are you sure you want to edit?',
  })
    .then(() => {
      showNotify({ background: '#FF5BC6', message: 'แก้ไขเรียบร้อย' })
      const formData = {
        userId: userId.value,
        displayName: displayName.value,
        statusMessage: statusMessage.value,
        gender: gender.value,
        showdate: showdate.value,
        telnum: telnum.value,
      }

      // อัปเดต localStorage
      localStorage.setItem('userId', formData.userId)
      localStorage.setItem('displayName', formData.displayName)
      localStorage.setItem('statusMessage', formData.statusMessage)
      localStorage.setItem('gender', formData.gender)
      localStorage.setItem('showdate', formData.showdate)
      localStorage.setItem('telnum', formData.telnum)
    })
    .catch(() => {
      console.log('user cancel edit')
    })
}

const logout = () => {
  showConfirmDialog({
    title: 'LOGOUT',
    message: 'Are you sure you want to logout?',
  })
    .then(() => {
      liff.logout()
      liff.login()
    })
    .catch((error) => {
      console.error('LIFF logout failed', error)
      console.log('user cancel logout')
    })
}

onMounted(() => {
  // 🟢 ถ้ามีข้อมูลจาก profileUser (มาจากหน้า login) ให้ดึงมาแสดงก่อน
  if (profileUser.value) {
    userId.value = profileUser.value.userId || ''
    displayName.value = profileUser.value.displayName || ''
    statusMessage.value = profileUser.value.statusMessage || ''
  }

  // 🟣 ของเดิม: ดึงจาก localStorage เผื่อผู้ใช้เคยกรอกเอง
  userId.value = localStorage.getItem('userId') || userId.value
  password.value = localStorage.getItem('password') || ''
  displayName.value = localStorage.getItem('displayName') || displayName.value
  statusMessage.value = localStorage.getItem('statusMessage') || statusMessage.value
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
}
</style>
