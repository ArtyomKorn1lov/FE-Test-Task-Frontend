import '@/styles/index.scss';
import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from '@/store';

const app = createApp(App);

app.use(store);

app.use(VueAxios, axios);

app.use(router);

app.mount('#app');
