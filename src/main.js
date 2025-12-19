import '@/assets/styles/index.scss';

import '@/di';
import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import VLoading from 'element-plus/es/components/loading/index';
import router from '@/router';
import App from '@/App.vue';
import { store } from '@/modules/accounts';
import Translations from '@/translations';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VLoading);
app.use(Translations);

app.mount('#app');
