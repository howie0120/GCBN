// 這段程式碼是一個用於處理使用者身份驗證和資訊的 Vuex 模組，用於在 Vue.js 應用程式中管理使用者的狀態以及處理使用者的登入和登出等操作。

import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router/route'

const getDefaultState = () => {
    return {
        token: getToken(),
        id: '',
        name: '',
        avatar: '',
        isLoggedIn: false
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_IS_LOGGED_IN: (state, isLoggedIn) => {
        state.isLoggedIn = isLoggedIn;
    },
    SET_ID: (state, id) => {
        state.id = id;
    }
}

const actions = {
    // user login
    login({ commit, dispatch }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                commit('SET_IS_LOGGED_IN', true);

                // 獲取使用者資訊
                dispatch('getInfo').then(() => {
                    resolve()
                });
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                    return reject('Verification failed, please Login again.')
                }

                const { id, name, avatar } = data
                commit('SET_ID', id)
                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

