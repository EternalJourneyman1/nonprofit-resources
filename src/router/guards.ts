import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { auth } from '../firebase/config'

export const requireAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (!auth.currentUser) {
    // Redirect to home page with a return path
    next({ 
      path: '/',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export const redirectIfAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (auth.currentUser) {
    next('/profile')
  } else {
    next()
  }
}