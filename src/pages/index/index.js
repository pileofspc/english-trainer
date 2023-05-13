import '@styles/general.scss';

import { createApp } from 'vue';
import { createRouter, createWebHistory } from "vue-router";

import LayoutDefault from '@components/LayoutDefault/LayoutDefault.vue';
import App from '/src/App.vue';
import PageMain from '@pages/index/PageMain.vue';
import PageTheme from '@pages/theme/PageTheme.vue';


let appNode = document.querySelector('.app-wrapper');
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: PageMain },
        { path: '/theme/:themeId', component: PageTheme },
    ]
});
const app = createApp(App).use(router);
app.component('LayoutDefault', LayoutDefault);
app.mount(appNode);