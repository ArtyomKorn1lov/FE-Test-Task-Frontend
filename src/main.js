import '@/assets/styles/index.scss';
import "@/di";
import 'virtual:svg-icons-register';

import {createApp} from 'vue';
import VLoading from "element-plus/es/components/loading/index";
import router from '@/router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from '@/App.vue';
import store from '@/modules/accounts/store';

const app = createApp(App);

app.use(store);
app.use(VueAxios, axios);
app.use(router);
app.use(VLoading);

app.mount('#app');
