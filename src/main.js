import '@/assets/styles/index.scss';

import {EnvService} from "@/core";
EnvService.init();

import "@/di";
import 'virtual:svg-icons-register';

import {createApp} from 'vue';
import VLoading from "element-plus/es/components/loading/index";
import router from '@/router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from '@/App.vue';
import store from '@/modules/accounts/store';
import Translations from "@/translations";

const app = createApp(App);

app.use(store);
app.use(VueAxios, axios);
app.use(router);
app.use(VLoading);
app.use(Translations);

app.mount('#app');
