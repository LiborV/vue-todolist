<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 offset-lg-3">
                <form
                    action="/"
                    @submit.prevent="resetPassword"
                >
                    <input
                        type="password"
                        aria-label="item"
                        class="form-control my-3"
                        placeholder="Token"
                        v-model="token"
                    >
                    <input
                        type="password"
                        aria-label="priority"
                        class="form-control my-3"
                        placeholder="New Password"
                        v-model="password"
                    >
                    <button class="input-group-text btn btn-success w-100">Reset Password</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()
        const state = reactive({
            token: '',
            password: ''
        })

        const resetPassword = async () => {
            const bodyParameters = {
                token: state.token,
                password: state.password
            }
            store.dispatch('auth/resetPassword', bodyParameters)
        }

        return {
            ...toRefs(state),
            resetPassword
        }
    }
}
</script>
