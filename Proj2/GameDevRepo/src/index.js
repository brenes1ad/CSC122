import { createRouter, createWebHistory } from 'vue-router';
import Home from './Home.vue';
import DevList from './DevList.vue';
import DevCreate from './DevCreate.vue';
import DevUpdate from './DevUpdate.vue';
import GameList from './GameList.vue';
import GameCreate from './GameCreate.vue';
import GameUpdate from './GameUpdate.vue';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/devs/list',
        name: 'DevList',
        component: DevList
    },
    {
        path: '/devs/create',
        name: 'DevCreate',
        component: DevCreate
    },
    {
        path: '/devs/update/:devId',
        name: 'DevUpdate',
        component: DevUpdate
    },
    {
        path: '/games/list',
        name: 'GameList',
        component: GameList
    },
    {
        path: '/games/create',
        name: 'GameCreate',
        component: GameCreate
    },
    {
        path: '/games/update/:gameId',
        name: 'GameUpdate',
        component: GameUpdate
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;


