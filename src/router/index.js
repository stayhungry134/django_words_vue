import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const routes = [{
    path: '/',
    component: () => import('~/layout/index.vue'),
    children: [
        {
            path: '/',
            component: () => import('~/pages/home/index.vue'),
        },
        {
          path: '/words/ebbinghaus',
            component: () => import('~/pages/words/ebbinghaus.vue')
        },
        {
            path: '/words/list',
            component: () => import('~/pages/words/list.vue')
        },
        {
          path: '/reading/article',
            component: () => import('~/pages/reading/article.vue')
        }]
}, {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('~/pages/404.vue'),
    meta: {
        title: '404'
    }
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router