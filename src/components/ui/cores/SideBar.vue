<template>
  <vs-sidebar v-model="active" absolute open class="sidebar">
    <div class="items">
      <vs-sidebar-item id="home">
        <template #icon>
          <i class="bx bx-home" />
        </template>
        <router-link to="/"> Home </router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="market">
        <template #icon>
          <i class="bx bx-grid-alt" />
        </template>
        Market Overview
      </vs-sidebar-item>
      <vs-sidebar-item id="Music">
        <template #icon>
          <i class="bx bxs-music" />
        </template>
        Music
      </vs-sidebar-item>
    </div>
  </vs-sidebar>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const active = ref("home");

    return {
      active,
    };
  },
};
</script>

<style scoped>
.sidebar {
  width: 20%;
  height: 80% !important;
  margin: 2% 0 0 2%;
  border-radius: 20px;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.items {
  margin-top: 20px;
}
</style>
