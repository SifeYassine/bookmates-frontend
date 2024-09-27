<template>
  <vs-sidebar v-model="active" absolute open class="sidebar" color="#5208b6">
    <div class="items">
      <vs-sidebar-item id="home" to="/">
        <template #icon>
          <i class="bx bx-home-alt-2" />
        </template>
        Home
      </vs-sidebar-item>
      <vs-sidebar-item id="book_posts" to="/book_posts">
        <template #icon>
          <i class="bx bx-grid-alt" />
        </template>
        Book Posts
      </vs-sidebar-item>
      <vs-sidebar-item v-if="isAdmin" id="genres" to="/genres">
        <template #icon>
          <i class="bx bx-tag" />
        </template>
        Genres
      </vs-sidebar-item>
    </div>
  </vs-sidebar>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  setup() {
    const active = ref("book_posts");
    const store = useStore();
    const route = useRoute();
    const isAdmin = computed(() => store.getters.isAdmin);

    const path = route.path;
    if (path) {
      active.value = path.split("/")[1];
    }

    return {
      active,
      isAdmin,
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
