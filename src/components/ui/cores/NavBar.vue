<template>
  <vs-navbar v-model="active" center-collapsed class="navbar">
    <template #left>
      <SearchBar />
    </template>
    <template #right>
      <vs-navbar-group>
        <vs-avatar id="avatar" history history-gradient shape="circle">
          <img src="@/assets/avatars/avatar-6.png" alt="" />
        </vs-avatar>
        <template #items>
          <vs-navbar-item @click="logout" id="logout"> Logout </vs-navbar-item>
        </template>
      </vs-navbar-group>
    </template>
  </vs-navbar>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import SearchBar from "../cores/SearchBar.vue";

export default {
  name: "NavBar",
  components: {
    SearchBar,
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    function logout() {
      store.dispatch("logout");
      router.push("/");
    }

    return {
      logout,
    };
  },
};
</script>

<style scoped>
.navbar {
  width: 75%;
  margin: 2% 0 0 22%;
  border-radius: 20px;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

#avatar {
  opacity: 1;
}
</style>
