import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/search',
      component: () => import('./views/Search.vue')
    },
    {
      path: '/profile',
      component: () => import('./views/Profile.vue')
    }
  ]
})

app.use(pinia)
app.use(router)
app.mount('#app')