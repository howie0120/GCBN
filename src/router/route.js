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
        path: '/cart',
        component: () => import('@/components/Page/cart'),
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
            meta: { title: 'Dashboard', icon: 'dashboard' }
        }]
    },

    {
        path: '/initiate',
        component: Layout,
        redirect: "/initiate/table",
        name: "Initiate",
        meta: { title: 'Initiate', icon: 'tree'},
        children: [
            {
                path: 'index',
                name: 'Form',
                component: () => import('@/components/Page/form/index'),
                meta: { title: 'Form', icon: 'form' }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () => import('@/views/tree/index'),
                meta: { title: 'Tree', icon: 'tree' }
            }
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


