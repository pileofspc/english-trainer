import '@styles/general.scss';

import { createApp } from 'vue';

import LayoutDefault from '@components/LayoutDefault.vue';
import App from '/src/App.vue';
import Router from '/src/Router.js';
import resizer from '/src/directives/resizer.js';

let appNode = document.querySelector('.app-wrapper');
const app = createApp(App).use(Router);
app.component('LayoutDefault', LayoutDefault);
app.directive('resizer', resizer)
app.mount(appNode);