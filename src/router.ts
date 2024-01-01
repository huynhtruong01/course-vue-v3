import { createRouter, createWebHistory } from 'vue-router'
import { HomePage, NotFound } from './page'

const routes = [
    {
        path: '/',
        name: 'home',
        alias: '/home',
        component: HomePage,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('./page/AboutPage.vue'),
    },
    {
        path: '/projects',
        name: 'projects',
        component: () => import('./page/ProjectsPage.vue'),
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('./page/ContactPage.vue'),
    },
    {
        path: '/posts',
        children: [
            {
                path: '',
                name: 'posts',
                component: () => import('./page/Posts.vue'),
            },
            {
                path: ':postId',
                component: () => import('./page/PostDetail.vue'),
            },
        ],
    },
    { path: '/:pathMatch(.*)*', name: 'not.found', component: NotFound },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return {
            top: 0,
        }
    },
})

export default router
