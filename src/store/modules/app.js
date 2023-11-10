// 這段程式碼主要是為了在 Vue.js 應用程式中管理側邊欄的狀態，以及處理設備類型的狀態。當用戶與應用程式進行互動時，可以調用 actions 來觸發相應的 mutations 以更改這些狀態，並使用 Cookie 來記錄側邊欄的開關狀態。


import Cookies from 'js-cookie'

const state = {
    sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false
    },
    device: 'desktop'
}

const mutations = {
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', 1)
        } else {
            Cookies.set('sidebarStatus', 0)
        }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        Cookies.set('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
        state.device = device
    }
}

const actions = {
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
        commit('TOGGLE_DEVICE', device)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
