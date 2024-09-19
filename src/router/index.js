import { createRouter, createWebHistory } from "vue-router";
import store from "@/store"; // Import the Vuex store to check authentication state

import Home from "@/components/pages/home/Home.vue";
import Login from "@/components/pages/auth/LoginForm.vue";
import Register from "@/components/pages/auth/RegisterForm.vue";
import Genres from "@/components/pages/genres/Genres.vue";
import NotFound from "@/components/pages/notFound/NotFound.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/genres", component: Genres },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Public routes (accessible without authentication)
  const publicPages = ["/", "/login", "/register"];

  // Check if the current route is public or requires authentication (protected)
  const protectedPages = !publicPages.includes(to.path);

  const isAuthenticated = store.getters.isAuthenticated;
  // const isAdmin = store.getters.isAdmin;

  // If the route requires authentication and user is not authenticated, redirect to /register
  if (protectedPages && !isAuthenticated) {
    return next("/register");
  }

  // If the user is not an admin and tries to access restricted routes, redirect to "Not Found" page
  // if (protectedPages && isAuthenticated && !isAdmin) {
  //   return next({ name: "NotFound" });
  // }

  // Otherwise, proceed to the route
  next();
});

export default router;
