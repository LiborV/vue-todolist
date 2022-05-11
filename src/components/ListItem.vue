<template>
    <div class="col-lg-4 my-4">
        <div class="border  py-3 ">
            <div
                :contenteditable="editing"
                ref="titleInput"
            >{{item.title}}</div>
            <div
                :contenteditable="editing"
                ref="priorityInput"
            >{{item.priority}}</div>
            <ListItemButton
                :idItem="item._id"
                @changeItem="editItem"
                :editing="editing"
            />
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import ListItemButton from '@/components/ListItemButton.vue'

import { useStore } from 'vuex'

export default {
    components: {
        ListItemButton
    },
    props: {
        item: {
            ẗype: Object
        }
    },

    setup(props) {
        const titleInput = ref(0)
        const priorityInput = ref(0)

        const store = useStore()
        const state = reactive({
            editing: false
        })

        const editItem = () => {
            if (state.editing) {
                state.editing = false

                if (
                    props.item.title != titleInput.value.textContent ||
                    props.item.priority != priorityInput.value.textContent
                ) {
                    console.log(props.item._id)

                    store.dispatch('list/editItem', {
                        data: {
                            title: titleInput.value.textContent,
                            priority: priorityInput.value.textContent
                        },
                        itemId: props.item._id
                    })
                    store.dispatch('list/getItems')
                }
            } else {
                state.editing = true
            }
        }

        return {
            ...toRefs(state),
            editItem,
            titleInput,
            priorityInput
        }
    }
}
</script>

<style>
div[contenteditable='true'] {
    background-color: #f8f7f7;
}
</style>