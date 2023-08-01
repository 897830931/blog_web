import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Router from './router/index';
import 'ant-design-vue/dist/antd.css';
import "tailwindcss/tailwind.css"
import { createPinia } from 'pinia';
const pinia = createPinia();
createApp(App)
    .use(pinia)
    .use(Router)
    .mount('#app')
