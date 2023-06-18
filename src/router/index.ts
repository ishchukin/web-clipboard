import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { Routes } from '../routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: Routes.Home,
      component: HomeView
    },
    {
      path: Routes.Settings,
      component: () => import('../views/SettingsView.vue')
    },
    {
      path: Routes.About,
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
