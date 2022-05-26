<template>
    <form
        action="/"
        @submit.prevent="userLogin"
    >
        <input
            type="text"
            aria-label="item"
            class="form-control my-3"
            placeholder="User Email"
            v-model="userEmail"
        >
        <input
            type="password"
            aria-label="priority"
            class="form-control my-3"
            placeholder="User Password"
            v-model="userPassword"
        >
        <button class="input-group-text btn btn-success w-100">Login</button>

    </form>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'

export default {
    setup() {
        // const router = useRouter()
        const store = useStore()
        const state = reactive({
            userEmail: '',
            userPassword: ''
        })

        const userLogin = async () => {
            const bodyParameters = {
                email: state.userEmail,
                password: state.userPassword
            }

            store.dispatch('auth/login', bodyParameters)
            // router.replace({ name: 'Home' })
        }
        return {
            ...toRefs(state),
            userLogin
        }
    }
}
</script>

<style>
</style>