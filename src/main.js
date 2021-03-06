/* eslint "no-unused-vars": "off" */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import bootstrap from 'bootstrap'

axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_SERVICE_URL
// axios.defaults.headers.common['Authorization'] = `Bearer ${document.cookie.split('=')[1]}`

createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')
