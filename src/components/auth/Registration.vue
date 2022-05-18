<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <form
                    action="/"
                    @submit.prevent="userRegistration"
                >
                    <div class="input-group">
                        <input
                            type="text"
                            aria-label="item"
                            class="form-control"
                            placeholder="name"
                            v-model="name"
                        >
                        <input
                            type="email"
                            aria-label="priority"
                            class="form-control"
                            placeholder="email"
                            v-model="email"
                        >
                        <input
                            type="
                            password"
                            aria-label="priority"
                            class="form-control"
                            placeholder="password"
                            v-model="password"
                        >
                        <button class="input-group-text btn btn-success">register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
import { reactive, toRefs } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()
        const state = reactive({
            name: 'libor3',
            email: 'libor3@gmail.com',
            password: '123456'
        })

        const userRegistration = async () => {
            const bodyParameters = {
                name: state.name,
                email: state.email,
                password: state.password
            }

            try {
                const res = await axios.post(
                    `http://localhost:3000/api/v1/auth/register`,
                    bodyParameters
                )
                store.commit('list/SET_TOKEN', res.data.data)
            } catch (error) {
                console.log(error)
            }
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