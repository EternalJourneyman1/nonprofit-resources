import { requireAuth } from './guards';

export const routes = [
    {
      path: '/',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/search',
      component: () => import('@/views/Search.vue')
    },
    {
      path: '/profile',
      component: () => import('@/views/Profile.vue'),
      beforeEnter: requireAuth
    }
  ]