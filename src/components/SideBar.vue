<template>
  <div
    v-if="
      $route.path !== '/' &&
      $route.path !== '/login' &&
      $route.path !== '/register'
    "
    class="w-[15vw] h-[80vh] p-[0.4rem] mt-[10vh] ml-[3vw] bg-[#5208b6] rounded-[20px] flex flex-col items-center transition-transform duration-300 ease-in-out shadow-lg z-[1000]"
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
</template>

<script>
export default {
  name: "SideBar",
};
</script>
