import { createRouter, createWebHistory } from "vue-router";
import store from "@/store"; // Import the Vuex store to check authentication state

import Home from "@/components/pages/home/Home.vue";
import Login from "@/components/pages/auth/LoginForm.vue";
import Register from "@/components/pages/auth/RegisterForm.vue";
import Genres from "@/components/pages/genres/Genres.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/genres", component: Genres },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Public routes (accessible without authentication)
  const publicPages = ["/", "/login", "/register"];

  // Check if the current route is public or requires authentication
  const authRequired = !publicPages.includes(to.path);

  const isAuthenticated = store.getters.isAuthenticated;

  // If the route requires authentication and user is not authenticated, redirect to /register
  if (authRequired && !isAuthenticated) {
    return next("/register");
  }

  // Otherwise, proceed to the route
  next();
});

export default router;
