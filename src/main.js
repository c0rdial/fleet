import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import VueSweetalert2 from 'vue-sweetalert2';
import VueApexCharts from "vue3-apexcharts";

import 'sweetalert2/dist/sweetalert2.min.css';


import "@/assets/scss/main.scss";

const app = createApp(App)

app.use(router);
app.use(store);
app.use(VueSweetalert2);
app.use(VueApexCharts);

app.mount('#app')
