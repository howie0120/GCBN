import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store";
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
        component: () => import('@/components/Page/auth/Login.vue'),
        hidden: true
    },
    {
        path: '/register',
        component: () =>import('@/components/Page/auth/Register.vue'),
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
        path: '/cart',
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
        }]
    },

    {
        path: '/admin',
        component: Layout,
        meta: { requiresAuth: true, permissions: 1 }, // 添加权限标记
        children: [
            {
                path: 'adminReview',
                name: 'AdminReview',
                component: () => import('@/components/Page/AdminReview'),
                meta: { title: '審核團購', icon: 'example', permissions: ['1'] }
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

router.beforeEach((to, from, next) => {
    const userPermissions = store.getters.permissions;

    console.log(userPermissions);

    if (to.matched.some(record => record.meta.requiresAuth && record.meta.permissions)) {
        if (userPermissions === "1") {
            next();
        } else {
            next({ path: '/dashboard' });
            showCustomAlert("沒有權限請使用管理員帳號");
        }
    } else {
        next();
    }
});

export default router


// alert 美編
function showCustomAlert(message) {
    // Create the alert container
    const alertContainer = document.createElement('div');
    alertContainer.id = 'customAlertContainer';
    alertContainer.style.cssText = `
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.4);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;
    setTimeout(() => alertContainer.style.opacity = '1', 0);

    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        text-align: center;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    setTimeout(() => alertBox.style.transform = 'scale(1)', 0);
    alertBox.innerHTML = `<p>${message}</p>`;

    const closeButton = document.createElement('button');
    closeButton.textContent = '關閉';
    closeButton.style.cssText = `
        margin-top: 10px;
        padding: 5px 10px;
        border: none;
        border-radius: 3px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        transition: background-color 0.2s;
    `;
    closeButton.onclick = function() {
        alertContainer.style.opacity = '0';
        setTimeout(() => document.body.removeChild(alertContainer), 300);
    };
    closeButton.onmouseover = function() {
        this.style.backgroundColor = '#0056b3';
    };
    closeButton.onmouseleave = function() {
        this.style.backgroundColor = '#007bff';
    };

    alertBox.appendChild(closeButton);
    alertContainer.appendChild(alertBox);
    document.body.appendChild(alertContainer);

    alertContainer.addEventListener('click', function(event) {
        if (event.target === alertContainer) {
            closeButton.click();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeButton.click();
        }
    });
}
