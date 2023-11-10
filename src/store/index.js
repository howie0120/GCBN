import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        settings,
        user
    },
    getters
})

export default store

// 操作。这是一个典型的 Vuex 设置，用于管理 Vue.js 应用程序的全局状态以及各个模块的状态。
