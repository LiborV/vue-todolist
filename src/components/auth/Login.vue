<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <form
                    action="/"
                    @submit.prevent="userLogin"
                >
                    <div class="input-group">
                        <input
                            type="text"
                            aria-label="item"
                            class="form-control"
                            v-model="userEmail"
                        >
                        <input
                            type="password"
                            aria-label="priority"
                            class="form-control"
                            v-model="userPassword"
                        >
                        <button class="input-group-text btn btn-success">login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
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

            try {
                store.dispatch('list/login', bodyParameters)
                // router.replace({ name: 'Home' })
            } catch (error) {
                console.log(error)
            }
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