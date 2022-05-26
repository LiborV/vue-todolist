<template>
    <div class="">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                    <Login />
                </div>
            </div>

            <div class="row">
                <div class="col-lg-6 offset-lg-3 d-flex justify-content-between my-3">
                    <router-link to="/forgotpassword">Forgot password</router-link> <br />
                    <router-link to="/registration">Registration</router-link>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Login from '@/components/auth/Login.vue'

import { reactive, toRefs } from 'vue'
export default {
    components: {
        Login
    },
    setup() {
        const state = reactive({
            count: 0
        })
        return {
            ...toRefs(state)
        }
    }
}
</script>

<style lang="scss">
@use '@/scss/style.scss';
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
