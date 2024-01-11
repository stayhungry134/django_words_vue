import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const routes = [{
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
        {
            path: '/',
            component: () => import('@/pages/home/index.vue'),
            name: 'Home',
        },
        // 单词模块
        {
          path: 'word',
            component: () => import('@/pages/words/word.vue'),
            children: [
                {
                    path: '',
                    component: () => import('@/pages/words/select-card.vue'),
                    name: 'Word',
                },
                {
                    path: 'review',
                    component: () => import('@/pages/words/review.vue'),
                    name: 'WordReview',
                },
                {
                    path: 'list',
                    component: () => import('@/pages/words/list.vue'),
                    name: 'WordList',
                },
                {
                    path: 'ebbinghaus',
                    component: () => import('@/pages/words/ebbinghaus.vue'),
                    name: 'WordEbbinghaus',
                },
            ]
        },
        // 阅读模块
        {
          path: 'reading',
            component: () => import('@/pages/reading/reading.vue'),
            name: 'reading',
        },
        ]
}, {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/404.vue'),
    meta: {
        title: '404'
    }
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router