import '@/assets/styles/index.scss';
import "@/di";
import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from '@/modules/accounts/store';

const app = createApp(App);

app.use(store);

app.use(VueAxios, axios);

app.use(router);

app.mount('#app');
