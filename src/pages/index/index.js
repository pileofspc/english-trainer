import '@styles/general.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '/src/App.vue';
import Router from '/src/Router.js';
import resizer from '/src/directives/resizer.js';
const pinia = createPinia();

const appNode = document.querySelector('.app-wrapper');
const app = createApp(App)
    .use(Router)
    .use(pinia)
    .directive('resizer', resizer)
    .mount(appNode);