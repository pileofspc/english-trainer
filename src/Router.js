import { createRouter, createWebHistory } from "vue-router";
import PageMain from "@pages/index/PageMain.vue";
import PageError from "@pages/error/PageError.vue";
import PageWordSet from "@pages/word-set/PageWordSet.vue";
import PageTrain from "@pages/train/PageTrain.vue";

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