<template>
    <div class="container">

        <div class="row">
            <div class="col">
                {{me}}
            </div>
        </div>
    </div>

</template>

<script>
import { computed, reactive, toRefs, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()
        const state = reactive({
        })

        onMounted(async () => {
            store.dispatch('list/getMe')
        })

        return {
            ...toRefs(state),
            me: computed(() => store.getters['list/getUser'])
        }
    }
}
</script>

<style>
</style>