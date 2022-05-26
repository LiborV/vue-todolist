<template>
    <div class="my-3" v-if="login">
        <AddItem />
        <div class="container">
            <div class="row">
                <ListItem
                    v-for="(item, index) in list"
                    :key="index"
                    :item=item
                >
                </ListItem>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, reactive, toRefs, onMounted } from 'vue'
import { useStore } from 'vuex'
import ListItem from '@/components/ListItem.vue'
import AddItem from '@/components/AddItem.vue'

export default {
    components: {
        ListItem,
        AddItem
    },
    setup() {
        const store = useStore()
        const state = reactive({})

        onMounted(() => {
            store.dispatch('list/getItems')
        })

        return {
            ...toRefs(state),
            list: computed(() => store.getters['list/getList']),
            login: computed(() => store.getters['getLogin'])
        }
    }
}
</script>

<style>
</style>
