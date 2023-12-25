import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);


import Layout from '@/components/Layout'

// 頁面
export const constantRoutes = [
    {
        path: '/home',
        component: () =>import('@/components/Page/Home.vue'),
        hidden: true
    },
    {
        path: '/login',
        component: () => import('@/components/Page/Login.vue'),
        hidden: true
    },
    {
        path: '/register',
        component: () =>import('@/components/Page/Register.vue'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/components/Page/dashBoard'),
            meta: { title: '首頁', icon: 'dashboard' }
        }]
    },

    {
        path: '/Group',
        component: Layout,
        redirect: "/Group/table",
        name: "Group",
        meta: { title: '團購列表', icon: 'tree'},
        children: [
            {
                path: 'Form',
                name: 'Form',
                component: () => import('@/components/Page/form/index'),
                meta: { title: '發起團購', icon: 'form' }
            },
            {
                path: 'joinGroup',
                name: 'joinGroup',
                component: () => import('@/components/Page/joinGroup/index.vue'),
                meta: { title: '支持團購', icon: 'tree' }
            }
        ]

    },

    {
        path: '/Group',
        component: Layout,
        children: [{
            path: '/cart',
            component: () => import('@/components/Page/cart'),
        }]
    },
    {
        path: '/account',
        component: Layout,
        children: [{
            path: '/account',
            component: () => import('@/components/Page/account'),
        },
        // {
        //     path: '/account/profile',
        //     component: () => import('@/components/Page/AccountProfile'),
        //     hidden: true
        // },
        // {
        //     path: '/account/notifications',
        //     component: () => import('@/components/Page/AccountNotifications'),
        //     hidden: true
        // },
        // {
        //     path: '/account/privacy',
        //     component: () => import('@/components/Page/AccountPrivacy'),
        //     hidden: true
        // },
        // {
        //     path: '/account/support',
        //     component: () => import('@/components/Page/AccountSupport'),
        //     hidden: true
        // }]
        ]
    }
]
const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router


