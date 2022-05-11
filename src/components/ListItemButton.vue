<template>
    <div>
        <div
            class="btn-toolbar mt-3"
            role="toolbar"
            aria-label="Toolbar with button groups"
        >
            <div
                class="btn-group m-auto"
                role="group"
                aria-label="First group"
            >
                <button
                    type="button "
                    class="btn btn-danger"
                    @click="deleteItem"
                >delete</button>
                <button
                    type="button"
                    class="btn btn-primary"
                    @click="editItemEvent"
                    ref="editInput"
                >edit</button>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import { useStore } from 'vuex'

export default {
    props: {
        idItem: {
            ẗype: String
        },
        editing: {
            type: Boolean
        }
    },
    setup(props, context) {
        const editInput = ref(null)
        const store = useStore()
        const state = reactive({})
        const deleteItem = () => {
            store.dispatch('list/deleteItem', props.idItem)
            store.dispatch('list/getItems')
        }

        const editItemEvent = () => {
            context.emit('changeItem')
            editInput.value.textContent = props.editing ? 'Edit' : 'Save'

            if (props.editing) {
                // console.log('odeslat data')
            }
        }

        return {
            ...toRefs(state),
            deleteItem,
            editItemEvent,
            editInput
        }
    }
}
</script>

<style>
</style>