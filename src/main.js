import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue'
import App from './App.vue'
import "@popperjs/core";
import "bootstrap"
import ApiPokedex from '@/views/ApiPokedex.vue'
import MyPokedex from '@/views/MyPokedex.vue'
const app = createApp(App);

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

