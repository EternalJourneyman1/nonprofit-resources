import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import { auth } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { routes } from './router/index'

const app = createApp(App)
const pinia = createPinia()
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Wait for Firebase Auth to initialize before mounting the app
let appMounted = false
onAuthStateChanged(auth, () => {
  if (!appMounted) {
    app.use(pinia)
    app.use(router)
    app.mount('#app')
    appMounted = true
  }
})