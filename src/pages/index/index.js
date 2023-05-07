import '@styles/general.scss';

import { createApp } from 'vue';
import MainPage from '@pages/index/MainPage.vue';

let appNode = document.querySelector('.app');
const app = createApp(MainPage);
app.mount(appNode);