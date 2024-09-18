import { createRouter, createWebHistory } from "vue-router";
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

export default router;
