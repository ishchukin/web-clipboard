import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './vuetify'
import 'vuetify/styles'

const app = createApp(App)

app.use(createPinia()).use(router).use(vuetify).mount('#app')
