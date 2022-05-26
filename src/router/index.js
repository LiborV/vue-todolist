import { createRouter, createWebHistory } from 'vue-router'
import List from '../components/List.vue'
import Registration from '../components/auth/Registration.vue'
import UpdatePassword from '../components/auth/UpdatePassword.vue'
import Forgotpassword from '../components/auth/ForgotPassword.vue'
import ResetPassword from '../components/auth/ResetPassword.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: List
    },
    {
        path: '/registration',
        name: 'Registration',
        component: Registration
    },
    {
        path: '/updatepassword',
        name: 'UpdatePassword',
        component: UpdatePassword
    },
    {
        path: '/forgotpassword',
        name: 'Forgotpassword',
        component: Forgotpassword
    },
    {
        path: '/resetpassword',
        name: 'ResetPassword',
        component: ResetPassword
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
