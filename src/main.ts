import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';
import "tailwindcss/tailwind.css"
import 'ant-design-vue/dist/antd.css';
import 'animate.css';
import elementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia';
const pinia = createPinia();
createApp(App)
    .use(pinia)
    .use(router)
    .use(elementPlus)
    .mount('#app')
