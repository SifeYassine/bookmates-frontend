<template>
  <ul
    class="list list-none p-0 px-[8vw] grid"
    style="grid-template-columns: repeat(6, 1fr); row-gap: 10px"
  >
    <li
      v-for="genre in filteredGenres"
      :key="genre.id"
      @click="onGenreClick(genre)"
    >
      <div>
        <h2>{{ genre.name }}</h2>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import EditGenreModal from "./EditGenreModal.vue";

export default {
  components: {
    EditGenreModal,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const genres = computed(() => store.state.genres);
    const searchQuery = computed(() => store.state.searchQuery);
    const selectedGenre = ref(null);
    const showEditModal = ref(false);

    const filteredGenres = computed(() => {
      const searchFilter = searchQuery.value.toLowerCase();

      if (!searchFilter) {
        return genres.value;
      }

      return genres.value.filter((genre) =>
        genre.name.toLowerCase().includes(searchFilter)
      );
    });

    async function fetchGenres() {
      store.dispatch("fetchGenres");
    }

    function onGenreClick(genre) {
      router.push({ path: "/book_posts", query: { genre: genre.name } });
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
      onGenreClick,
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

li {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #5208b6;
  color: #5208b6;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
}
</style>
