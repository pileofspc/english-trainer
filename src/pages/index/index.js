import '@styles/_reset.scss';

import { createApp } from 'vue';
import MainPage from '@pages/index/MainPage.vue';

const app = createApp(MainPage);
app.mount(document.body);