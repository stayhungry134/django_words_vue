import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const routes = [{
    path: '/',
    component: () => import('~/layout/index.vue'),
    children: [{
        path: '/',
        component: () => import('~/pages/ebbinghaus/index.vue'),
    }, {
      path: '/word',
        component: () => import('~/pages/ebbinghaus/word.vue')
    }, {
      path: '/article',
        component: () => import('~/pages/ebbinghaus/article.vue')
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