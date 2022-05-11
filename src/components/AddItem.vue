<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <form
                    action="/"
                    @submit.prevent="addItem"
                >
                    <div class="input-group">
                        <input
                            type="text"
                            aria-label="item"
                            class="form-control"
                            v-model="itemTitle"
                        >
                        <input
                            type="number"
                            aria-label="priority"
                            class="form-control"
                            v-model="itemPriority"
                        >
                        <button class="input-group-text btn btn-success">Add item and priority</button>
                    </div>
                </form>
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

        const state = reactive({
            itemTitle: '',
            itemPriority: ''
        })

        const addItem = async () => {
            store.dispatch('list/addItem', {
                title: state.itemTitle,
                priority: state.itemPriority
            })

            store.dispatch('list/getItems')
        }
        return {
            ...toRefs(state),
            addItem
        }
    }
}
</script>

<style>
</style>