import { createRouter, createWebHistory } from 'vue-router';
import Home from './Home.vue';
import AuthorList from './AuthorList.vue';
import AuthorCreate from './AuthorCreate.vue';
import AuthorUpdate from './AuthorUpdate.vue';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/authors/list',
        name: 'AuthorList',
        component: AuthorList
    },
    {
        path: '/authors/create',
        name: 'AuthorCreate',
        component: AuthorCreate
    },
    {
        path: '/authors/update/:authorId',
        name: 'AuthorUpdate',
        component: AuthorUpdate,
        props: true
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;