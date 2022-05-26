<template>
    <div class="container" v-if="login">
        <div class="row">
            <div class="col-lg-6 offset-lg-3">
                <form
                    action="/"
                    @submit.prevent="updatePassword"
                >
                    <input
                        type="password"
                        aria-label="item"
                        class="form-control my-3"
                        placeholder="Current Password"
                        v-model="currentPassword"
                    >
                    <input
                        type="password"
                        aria-label="priority"
                        class="form-control my-3"
                        placeholder="New Password"
                        v-model="newPassword"
                    >
                    <button class="input-group-text btn btn-success w-100">Update Password</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()
        const state = reactive({
            currentPassword: '',
            newPassword: ''
        })

        onMounted(() => {
            store.dispatch('auth/getMe')
        })

        const updatePassword = async () => {
            const bodyParameters = {
                currentPassword: state.currentPassword,
                newPassword: state.newPassword
            }
            store.dispatch('auth/updatePassword', bodyParameters)
        }

        return {
            ...toRefs(state),
            updatePassword,
            login: computed(() => store.getters['getLogin'])
        }
    }
}
</script>
