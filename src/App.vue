<template>
  <div id="app">
    <nav
      class="py-2 bg-[#5208b6] w-[90%] mx-auto mt-[2vh] rounded-[20px] flex justify-between items-center"
    >
      <div class="logo ml-5">
        <img src="@/assets/logo.png" class="w-[100px]" alt="Logo" />
      </div>
      <div>
        <router-link v-if="$route.path !== '/'" to="/" class="text-white"
          >Home</router-link
        >
        <router-link v-if="!isAuthenticated" to="/login" class="text-white"
          >Login</router-link
        >
        <router-link v-if="!isAuthenticated" to="/register" class="text-white"
          >Register</router-link
        >
        <button v-else @click="logout" class="text-white">Logout</button>
      </div>
      <div
        v-if="
          $route.path !== '/' &&
          $route.path !== '/login' &&
          $route.path !== '/register'
        "
        class="sidebar"
      >
        <router-link
          v-if="isAuthenticated && isAdmin"
          to="/admin"
          class="text-white"
          >Admin Panel</router-link
        >
        <router-link v-if="isAuthenticated" to="/genres" class="text-white"
          >Genres</router-link
        >
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const isAdmin = computed(() => store.getters.isAdmin);

    const logout = () => {
      store.dispatch("logout");
      router.push("/login");
    };

    return {
      isAuthenticated,
      isAdmin,
      logout,
    };
  },
};
</script>
