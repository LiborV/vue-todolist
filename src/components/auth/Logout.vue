<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <button
                    class="input-group-text btn btn-danger"
                    @click="userLogout"
                >logout</button>

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
        const state = reactive({})

        const userLogout = async () => {
            store.dispatch('auth/logout')
        }

        return {
            ...toRefs(state),
            userLogout
        }
    }
}
</script>

<style>
</style>