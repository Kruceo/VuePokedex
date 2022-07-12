import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue'
import App from './App.vue'
import "@popperjs/core";
import "bootstrap"
import Notifications from '@kyvg/vue3-notification';
import ApiPokedex from '@/views/ApiPokedex.vue'
import MyPokedex from '@/views/MyPokedex.vue'
const app = createApp(App);
app.use(Notifications)

const routes = [
    {
        path: "/",
        name: "ApiPokedex",
        component: ApiPokedex,
    },
    {
        path: "/mypokedex",
        name: "MyPokedex",
        component: MyPokedex,
    },
];
const router = createRouter({ history: createWebHistory(), routes });
app.use(router);
app.mount('#app');

