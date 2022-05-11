import { createStore } from 'vuex'
import axios from 'axios'

const list = {
    namespaced: true,
    state: {
        list: [],
        protect: false,
        token: '',
        userId: '',
        user: ''
    },
    mutations: {
        SET_LIST(state, data) {
            state.list = data
        },

        SET_PROTECT(state, data) {
            state.protect = data
        },

        SET_TOKEN(state, data) {
            state.token = data
        },

        SET_USER_ID(state, data) {
            state.userId = data
        },

        SET_USER(state, data) {
            state.user = data
        }

    },
    actions: {
        // https://blog.logrocket.com/consume-apis-with-vuex-pinia-axios/
        async getItems({ state, commit }) {
            if (!state.token) {
                commit('SET_TOKEN', document.cookie.split('=')[1])
            }

            const config = {
                headers: {
                    "Content-type": "Application/json",
                    Authorization: `Bearer ${state.token}`
                }
            }

            let role = 'user'
            if (!state.userId) {
                const data = await axios.get(`${process.env.VUE_APP_SERVICE_URL}/api/v1/auth/me`, config)
                role = data.data.data.role
                commit('SET_USER_ID', data.data.data._id)
            }


            if (role === 'admin') {
                const data = await axios.get(`${process.env.VUE_APP_SERVICE_URL}/api/v1/items`, config)

                commit('SET_PROTECT', data.data.success)
                commit('SET_LIST', data.data.data)
            } else {
                try {
                    const data = await axios.get(`${process.env.VUE_APP_SERVICE_URL}/api/v1/users/${state.userId}/items`, config)

                    commit('SET_PROTECT', data.data.success)
                    commit('SET_LIST', data.data.data)
                }
                catch (error) {
                    console.log(error)
                }
            }
        },

        async getMe({ state, commit }) {
            if (!state.token) {
                commit('SET_TOKEN', document.cookie.split('=')[1])
            }

            try {
                const data = await axios.get(`${process.env.VUE_APP_SERVICE_URL}/api/v1/auth/me`, {
                    headers: {
                        'Content-type': 'Application/json',
                        Authorization: `Bearer ${state.token}`
                    }
                })
                commit('SET_PROTECT', data.data.success)
                commit('SET_USER', data.data)
            } catch (error) {
                console.log(error)
            }
        },

        async login({ commit }, bodyParameters) {
            try {
                const res = await axios.post(
                    `${process.env.VUE_APP_SERVICE_URL}/api/v1/auth/login`,
                    bodyParameters
                )
                commit('SET_PROTECT', res.data.success)
                commit('SET_TOKEN', res.data.data)

            } catch (error) {
                console.log(error)
            }
        },

        async addItem({ state, commit }, bodyParameters) {
            if (!state.token) {
                commit('SET_TOKEN', document.cookie.split('=')[1])
            }

            const config = {
                headers: {
                    "Content-type": "Application/json",
                    Authorization: `Bearer ${state.token}`
                }
            }

            if (!state.userId) {
                const data = await axios.get(`${process.env.VUE_APP_SERVICE_URL}/api/v1/auth/me`, config)
                commit('SET_USER_ID', data.data.data._id)
            }


            await axios.post(`${process.env.VUE_APP_SERVICE_URL}/api/v1/users/${state.userId}/items`,
                bodyParameters,
                config
            )
        },

        async editItem({ state, commit }, data) {
            if (!state.token) {
                commit('SET_TOKEN', document.cookie.split('=')[1])
            }
            const config = {
                headers: {
                    "Content-type": "Application/json",
                    Authorization: `Bearer ${state.token}`
                }
            }

            await axios.put(`${process.env.VUE_APP_SERVICE_URL}/api/v1/items/${data.itemId}`,
                data.data,
                config
            )
        },

        async deleteItem({ state, commit }, itemId) {
            if (!state.token) {
                commit('SET_TOKEN', document.cookie.split('=')[1])
            }
            const config = {
                headers: {
                    "Content-type": "Application/json",
                    Authorization: `Bearer ${state.token}`
                }
            }
            await axios.delete(`${process.env.VUE_APP_SERVICE_URL}/api/v1/items/${itemId}`, config)
        },

        async logout({ state, commit }) {
            if (!state.token) {
                commit('SET_TOKEN', document.cookie.split('=')[1])
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            }

            try {
                await axios.get(`${process.env.VUE_APP_SERVICE_URL}/api/v1/auth/logout`, config)
                commit('SET_USER_ID', '')
                commit('SET_TOKEN', '')
                commit('SET_PROTECT', false)
                commit('SET_USER', '')
            } catch (error) {
                console.log(error)
            }

        }
    },
    getters: {
        getList(state) {
            return state.list
        },

        getProtect(state) {
            return state.protect
        },

        getToken(state) {
            return state.token
        },

        getUser(state) {
            return state.user
        },

        getConfigToken(state) {
            return {
                headers: {
                    'Content-type': 'Application/json',
                    Authorization: `Bearer ${state.token}`
                }
            }
        }
    }

}

// const a = {
//     state: {
//         users: []
//     },
//     getters: {
//         getUsers: (state) => state.users
//     },

//     mutations: {
//         SET_LIST(state, users) {
//             state.users = users
//         }
//     }
// })



export default createStore({
    modules: {
        list
    }
})


// set token
// https://github.com/codyseibert/tab-tracker/blob/master/client/src/store/store.js