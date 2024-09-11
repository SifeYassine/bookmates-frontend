<template>
  <div>
    <h1>Genres</h1>

    <!-- Search Bar Component -->
    <SearchBar @search="handleSearch" />

    <button @click="showAddModal = true" class="add-button">Add Genre</button>

    <!-- Add Genre Modal -->
    <AddGenreModal :showModal="showAddModal" @close="showAddModal = false" />

    <!-- Edit Genre Modal -->
    <EditGenreModal
      :showModal="showEditModal"
      :genre="selectedGenre"
      @close="showEditModal = false"
    />

    <ul>
      <li v-for="genre in filteredGenres" :key="genre.id">
        <h2>{{ genre.name }}</h2>
        <div class="card-buttons">
          <button @click="editGenre(genre)" class="edit-button">Edit</button>
          <button @click="deleteGenre(genre.id)" class="delete-button">
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import AddGenreModal from "./AddGenreModal.vue";
import EditGenreModal from "./EditGenreModal.vue";
import SearchBar from "./SearchBar.vue";

export default {
  components: {
    AddGenreModal,
    EditGenreModal,
    SearchBar,
  },
  setup() {
    const store = useStore();
    const genres = computed(() => store.state.genres);

    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const selectedGenre = ref(null);
    const searchQuery = ref("");

    async function fetchGenres() {
      store.dispatch("fetchGenres");
    }

    const filteredGenres = computed(() => {
      if (!searchQuery.value) {
        return genres.value;
      }
      return genres.value.filter((genre) =>
        genre.name.includes(searchQuery.value)
      );
    });

    function handleSearch(query) {
      searchQuery.value = query;
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
      showAddModal,
      showEditModal,
      selectedGenre,
      handleSearch,
    };
  },
};
</script>
