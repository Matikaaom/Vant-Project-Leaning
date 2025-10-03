import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import 'vant/lib/index.css';
import thTH from 'vant/es/locale/lang/th-TH'
// import enEN from 'vant/es/locale/lang/en-US'
import { Locale } from 'vant';

const app = createApp(App)
Locale.use('th-TH', thTH)
// Locale.use('en-US', enEN)
app.use(router)
app.mount('#app')
