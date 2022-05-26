<template>
<div class="border">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <Me />
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarScroll"
                aria-controls="navbarScroll"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div
                class="collapse navbar-collapse"
                id="navbarScroll"
            >
                <ul
                    class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                    style="--bs-scroll-height: 100px;"
                >
                    <li class="nav-item">
                        <a
                            class="nav-link active"
                            aria-current="page"
                            href="#"
                        >
                            <router-link to="/">Home</router-link>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            href="#"
                        >
                            <router-link to="/updatepassword">UpdatePassword</router-link>
                        </a>
                    </li>
                </ul>
                <div>
                    <Logout />
                </div>
            </div>
        </div>
    </nav>
</div>
</template>
<script>
import Logout from '@/components/auth/Logout.vue'
import Me from '@/components/auth/Me.vue'

import { reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    components: {
        Logout,
        Me
    },
    setup() {
        const store = useStore()
        const state = reactive({
            login: computed(() => store.getters['getLogin'])
        })

        return {
            ...toRefs(state),
            protect: computed(() => store.getters['list/getProtect']),
            message: computed(() => store.getters['getMessage']),
            MessageClass: computed(() => store.getters['getMessageClass'])
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
