import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/user';

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/view/login/login.vue')
    },
    {
        path: '/',
        name: 'home',
        component: () => import('@/view/Home/index.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes
});
// 路由前置守卫
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    if (to.name !== 'login' && !userStore.getToken) {
        next({ path: 'login', name: 'login' })

    }
    if (to.name == 'login' && userStore.getToken) {
        next({ name: 'home' })
    }
    next();
})
// 路由报错
// router.onError()

export default router;
