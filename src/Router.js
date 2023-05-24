import { createRouter, createWebHistory } from "vue-router";

const PageMain = () => import("@pages/index/PageMain.vue");
const PageError = () => import("@pages/error/PageError.vue");
const PageWordSet = () => import("@pages/word-set/PageWordSet.vue");
const PageTrain = () => import("@pages/train/PageTrain.vue");

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: PageError
        },
        {
            path: '/',
            component: PageMain
        },
        {
            path: '/word-set/:wordSetId',
            component: PageWordSet
        },
        {
            path: '/word-set/:wordSetId/:trainingType',
            name: 'PageTrain',
            component: PageTrain
        },
    ]
});