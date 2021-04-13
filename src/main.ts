import { createApp } from 'vue'
import App from '@/layouts/App.vue'
import router from './router'
import { store, key } from './store'
// import 'ant-design-vue/dist/antd.css'
import '@/assets/css/index.styl'

const app = createApp(App)
app.use(store, key)
app.use(router)
app.mount('#app')
