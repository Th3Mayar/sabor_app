import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = sessionStorage.getItem('authToken')

    // if (!token && to.path !== '/auth/login') {
    //   // return navigateTo('/error')
    // }

    if (token && to.path === '/auth/login') {
      return navigateTo('/reservation')
    }
    if (!token && to.path !== '/auth/login') {
      return navigateTo('/error')
    }
    // Allow navigation to other routes if no conditions are met
    return
  }
})
