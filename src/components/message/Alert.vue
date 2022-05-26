<template>
        <div
           :class="getMessageClass"
            role="alert"
        >
            {{message}}
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
            message: computed(() => store.getters['getMessage']),
            getMessageClass: computed(() => store.getters['getMessageClass']),

        }
    }
}
</script>

<style lang="scss" scoped>
</style>