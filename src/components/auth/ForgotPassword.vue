<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 offset-lg-3">
                <form
                    action="/"
                    @submit.prevent="forgotPassword"
                >
                    <input
                        type="email"
                        aria-label="item"
                        class="form-control my-3"
                        placeholder="Add email"
                        v-model="email"
                    >
                    <button class="input-group-text btn btn-success w-100">Forgot Password</button>
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
            email: ''
        })

        const forgotPassword = async () => {
            store.dispatch('auth/forgotPassword', state.email)
        }

        return {
            ...toRefs(state),
            forgotPassword
        }
    }
}
</script>
