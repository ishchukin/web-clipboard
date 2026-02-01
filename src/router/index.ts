import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Routes from '../routes'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: Routes.Home,
      component: HomeView,
      name: 'Web Clipboard'
    },
    {
      path: Routes.Settings,
      component: () => import('../views/SettingsView.vue'),
      name: 'Settings'
    },
    {
      path: Routes.About,
      component: () => import('../views/AboutView.vue'),
      name: 'About'
    }
  ]
})

export default router
