import '@styles/general.scss';

import { createApp } from 'vue';
import LayoutDefault from '@components/LayoutDefault/LayoutDefault.vue';
import PageMain from '@pages/theme/PageTheme.vue';

let appNode = document.querySelector('.app-wrapper');
const app = createApp(PageMain);
app.component('LayoutDefault', LayoutDefault);
app.mount(appNode);