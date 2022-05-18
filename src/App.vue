<template>
    <div>

        <div id="nav">
            {{protect}}
            |
            <router-link
                to="/"
                v-if="protect"
            >Home</router-link>
            |
            <router-link
                to="/me"
                v-if="protect"
            >Get Me</router-link>
            |
            <router-link
                to="/login"
                v-if="!protect"
            >Login</router-link>
            |
            <router-link
                to="/logout"
                v-if="protect"
            >Logout</router-link>
            |
            <router-link to="/registration">Registration</router-link>

        </div>
        <router-view />
    </div>
</template>
<script>
import { reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()
        const state = reactive({
            count: 0
        })

        return {
            ...toRefs(state),
            protect: computed(() => store.getters['list/getProtect'])
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
