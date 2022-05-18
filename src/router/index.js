import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/auth/Login.vue'
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
        path: '/login',
        name: 'Login',
        component:Login
    },
    {
        path: '/registration',
        name: 'Registration',
        component: Registration
    }
    ,
    {
        path: '/me',
        name: 'Me',
        component: Me
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
