<template>
    <div
        class="border px-3"
        v-if="me">
        {{me.data.name}} | {{me.data.email}} | {{me.data.role}}
    </div>
</template>

<script>
import { computed, reactive, toRefs, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()
        const state = reactive({})

        onMounted(async () => {
            store.dispatch('auth/getMe')
        })

        return {
            ...toRefs(state),
            me: computed(() => store.getters['getUser'])
        }
    }
}
</script>

<style>
</style>