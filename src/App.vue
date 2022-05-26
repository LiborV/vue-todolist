<template>
    <div v-cloak>
        <Alert />
        <StatusLoggedIn v-if="login" v-cloak />
        <StatusLoggedOut v-if="!login" v-cloak />
        <router-view v-cloak />
    </div>
</template>
<script>
import StatusLoggedIn from '@/views/StatusLoggedIn.vue'
import StatusLoggedOut from '@/views/StatusLoggedOut.vue'
import Alert from '@/components/message/Alert.vue'

import { reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    components: {
        StatusLoggedIn,
        StatusLoggedOut,
        Alert
    },
    setup() {
        const store = useStore()
        const state = reactive({
            login: computed(() => store.getters['getLogin'])
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

[v-cloak] {
    display: none;
}
</style>
