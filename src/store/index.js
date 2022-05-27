/* eslint "no-unused-vars": "off" */

import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router/index.js'
// import router from 'vue-router'


const ListModule = {
    namespaced: true,
    state: {
        list: [],
        editing: false
    },
    mutations: {
        SET_LIST(state, data) {
            state.list = data
        },

        SET_EDITING(state, data) {
            state.editing = data
        }
    },
    getters: {
        getList(state) {
            return state.list
        },

        getEditing(state) {
            return state.editing
        },
    },
    actions: {
        // https://blog.logrocket.com/consume-apis-with-vuex-pinia-axios/
        async getItems({ commit, rootState, dispatch }) {
            await dispatch('auth/getMe', '', { root: true })
            const user = rootState.user.data

            if (user.role === 'admin') {
                const allItems = await axios.get(`items`)
                commit('SET_LIST', allItems.data.data)
            } else {
                const userItems = await axios.get(`users/${user._id}/items`)
                commit('SET_LIST', userItems.data.data)
            }
        },

        async editItem({ commit, dispatch }, data) {
            try {
                await axios.put(`items/${data.itemId}`, data.data)
                commit('SET_MESSAGE', '', { root: true })
                commit('SET_MESSAGE_CLASS', '', { root: true })
                commit('SET_EDITING', false)
            } catch (error) {
                console.log(error)
                commit('SET_MESSAGE', error.response.data.error, { root: true })
                commit('SET_MESSAGE_CLASS', 'alert alert-danger', { root: true })
                commit('SET_EDITING', true)
            }
            dispatch('getItems')
        },

        async addItem({ commit, dispatch }, bodyParameters) {
            try {
                const getMe = await axios.get('auth/me')
                await axios.post(`users/${getMe.data.data._id}/items`, bodyParameters,)
                dispatch('getItems')
            } catch (error) {
                console.log(error)
                commit('SET_MESSAGE', error.response.data.error, { root: true })
                commit('SET_MESSAGE_CLASS', 'alert alert-danger', { root: true })
            }

        },

        async deleteItem({ commit }, itemId) {
            try {
                await axios.delete(`items/${itemId}`)
            } catch (error) {
                console.log(error)
            }
        },
    }
}

const AuthModule = {
    namespaced: true,
    actions: {
        async getMe({ commit }) {
            try {
                const getMe = await axios.get('auth/me')
                commit('SET_USER', getMe.data, { root: true })
                commit('SET_LOGIN', true, { root: true })
            } catch (error) {
                console.log(error)
                commit('SET_MESSAGE', error.response.data.error, { root: true })
                commit('SET_MESSAGE_CLASS', 'alert alert-danger', { root: true })
            }
        },

        async login({ commit, dispatch }, bodyParameters) {
            try {
                await axios.post('auth/login', bodyParameters)
                commit('SET_MESSAGE', '', { root: true })
                commit('SET_MESSAGE_CLASS', '', { root: true })
                dispatch('list/getItems', '', { root: true })
                commit('SET_LOGIN', true, { root: true })
                router.replace({ name: 'Home' })
            } catch (error) {
                commit('SET_MESSAGE', 'Invalid credentials', { root: true })
                commit('SET_MESSAGE_CLASS', 'alert alert-danger', { root: true })
                console.log(error)
            }
        },

        async logout({ commit }) {
            try {
                await axios.get(`auth/logout`)
                commit('SET_USER', '', { root: true })
                commit('list/SET_LIST', '', { root: true })
                commit('SET_LOGIN', false, { root: true })
                router.replace({ name: 'Home' })
            } catch (error) {
                console.log(error)
            }
        },

        async registration({ commit }, bodyParameters) {
            try {
                await axios.post(`auth/register`, bodyParameters)
                router.replace({ name: 'Home' })
            } catch (error) {
                console.log(error)
                commit('SET_MESSAGE', error.response.data.error, { root: true })
                commit('SET_MESSAGE_CLASS', 'alert alert-danger', { root: true })
            }
        },

        async updatePassword({ commit }, bodyParameters) {
            try {
                await axios.put(`auth/updatepassword`, bodyParameters)
            } catch (error) {
                console.log(error)
                commit('SET_MESSAGE', error.response.data.error, { root: true })
                commit('SET_MESSAGE_CLASS', 'alert alert-danger', { root: true })
            }
        },

        async forgotPassword({ commit }, email) {
            try {
                await axios.post(`auth/forgotpassword`, { email })
            } catch (error) {
                console.log(error)
                commit('SET_MESSAGE', error.response.data.error, { root: true })
                commit('SET_MESSAGE_CLASS', 'alert alert-danger', { root: true })
            }
        },

        async resetPassword({ commit }, bodyParameters) {
            const { password, token } = bodyParameters
            try {
                await axios.put(`auth/resetpassword/${token}`, { password })
                router.replace({ name: 'Home' })
            } catch (error) {
                console.log(error)
                commit('SET_MESSAGE', error.response.data.error, { root: true })
                commit('SET_MESSAGE_CLASS', 'alert alert-danger', { root: true })
            }
        }
    }
}

export default createStore({
    modules: {
        list: ListModule,
        auth: AuthModule,
    },
    state: {
        user: '',
        message: '',
        messageClass: '',
        login: false
    },
    mutations: {
        SET_USER(state, data) {
            state.user = data
        },

        SET_MESSAGE(state, data) {
            state.message = data
        },

        SET_MESSAGE_CLASS(state, data) {
            state.messageClass = data
        },

        SET_LOGIN(state, data) {
            state.login = data
        }
    },
    getters: {
        getUser(state) {
            return state.user
        },

        getMessage(state) {
            return state.message
        },

        getMessageClass(state) {
            return state.messageClass
        },

        getLogin(state) {
            return state.login
        }
    },
})
