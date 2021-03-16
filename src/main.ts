import { createApp } from 'vue'
import App from '@/layouts/App.vue'
import router from './router'
import store from './store'
// import 'ant-design-vue/dist/antd.css'
import '@/assets/css/index.styl'

createApp(App).use(store).use(router).mount('#app')
