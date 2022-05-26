<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 offset-lg-3">
                <form
                    action="/"
                    @submit.prevent="userRegistration"
                >
                        <input
                            type="text"
                            aria-label="item"
                            class="form-control my-3"
                            placeholder="name"
                            v-model="name"
                        >
                        <input
                            type="email"
                            aria-label="priority"
                            class="form-control my-3"
                            placeholder="email"
                            v-model="email"
                        >
                        <input
                            type="
                            password"
                            aria-label="priority"
                            class="form-control my-3"
                            placeholder="password"
                            v-model="password"
                        >
                        <button class="input-group-text btn btn-success">Registration</button>
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
            name: '',
            email: '',
            password: ''
        })

        const userRegistration = async () => {
            const bodyParameters = {
                name: state.name,
                email: state.email,
                password: state.password
            }

            await store.dispatch('auth/registration', bodyParameters)
        }

        return {
            ...toRefs(state),
            userRegistration
        }
    }
}
</script>

<style>
</style>