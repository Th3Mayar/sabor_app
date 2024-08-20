import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const token = sessionStorage.getItem("authToken");

    if (token && to.path === "/auth/login") {
      return navigateTo("/reservation");
    }

    if (!token && to.path !== "/auth/login") {
      return navigateTo("/auth/login");
    }
  }
});
