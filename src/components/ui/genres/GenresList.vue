<template>
  <ul
    class="list list-none p-0 px-[8vw] grid gap-5"
    style="grid-template-columns: repeat(6, 1fr)"
  >
    <li v-for="genre in filteredGenres" :key="genre.id">
      <h2>{{ genre.name }}</h2>
    </li>
  </ul>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import EditGenreModal from "./EditGenreModal.vue";

export default {
  components: {
    EditGenreModal,
  },
  setup() {
    const store = useStore();
    const genres = computed(() => store.state.genres);
    const searchQuery = computed(() => store.state.searchQuery);
    const selectedGenre = ref(null);
    const showEditModal = ref(false);

    const filteredGenres = computed(() => {
      if (!searchQuery.value) {
        return genres.value;
      }
      return genres.value.filter((genre) =>
        genre.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    async function fetchGenres() {
      store.dispatch("fetchGenres");
    }

    async function editGenre(genre) {
      selectedGenre.value = genre;
      showEditModal.value = true;
    }

    async function deleteGenre(id) {
      try {
        await store.dispatch("deleteGenre", id);
      } catch (error) {
        console.error("Failed to delete genre:", error);
      }
    }

    onMounted(fetchGenres);

    return {
      filteredGenres,
      deleteGenre,
      editGenre,
      showEditModal,
      selectedGenre,
    };
  },
};
</script>

<style scoped>
.list {
  width: 75%;
  margin: 2% 0 0 22%;
  border-radius: 20px;
  border: 1px solid red;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
