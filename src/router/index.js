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
            children: [
                {
                    path: '',
                    component: () => import('@/pages/reading/select-card.vue'),
                    name: 'Reading',
                },
                {
                    path: 'article',
                    component: () => import('@/pages/reading/article.vue'),
                    name: 'Article',
                },
                {
                    path: 'book',
                    component: () => import('@/pages/reading/book.vue'),
                    name: 'Book',
                },
                {
                    path: 'book-reader',
                    component: () => import('@/pages/reading/book-reader.vue'),
                    name: 'BookReader',
                },
                {
                    path: 'magazine',
                    component: () => import('@/pages/reading/magazine.vue'),
                    name: 'Magazine',
                },
                {
                    path: 'pdf-reader',
                    component: () => import('@/pages/reading/pdf-reader.vue'),
                    name: 'PdfReader',
                },
            ]
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