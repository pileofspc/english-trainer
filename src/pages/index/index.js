import '@styles/general.scss';

import { createApp } from 'vue';
import PageMain from '@pages/index/PageMain.vue';

let appNode = document.querySelector('.app-wrapper');
const app = createApp(PageMain);
app.mount(appNode);