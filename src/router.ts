import { ContactPage, ProjectsPage, AboutPage, HomePage } from './page'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/about',
        name: 'About',
        component: AboutPage,
    },
    {
        path: '/projects',
        name: 'Projects',
        component: ProjectsPage,
    },
    {
        path: '/contact',
        name: 'Contact',
        component: ContactPage,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
