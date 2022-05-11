import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import Registration from '../components/auth/Registration.vue'
import Me from '../components/auth/Me.vue'
import Logout from '../components/auth/Logout.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/auth',
        name: 'Auth',
        component: Auth
    },
    {
        path: '/auth/registration',
        name: 'Registration',
        component: Registration
    }
    ,
    {
        path: '/auth/me',
        name: 'Me',
        component: Me
    },
    {
        path: '/auth/logout',
        name: 'Logout',
        component: Logout
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
