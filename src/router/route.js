import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);


// 頁面

export const constantRoutes = [
    {
        path: '/',
        component: () =>import('@/components/Home.vue'),
        hidden: true
    },
    {
        path: '/login',
        component: () => import('@/components/Login.vue'),
        hidden: true
    },
    {
        path: '/register',
        component: () =>import('@/components/Register.vue'),
        hidden: true
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


