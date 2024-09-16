<template>
  <div class="flex">
    <!-- SideBar -->
    <SideBar />
    <div>
      <h1>Genres</h1>

      <!-- Search Bar Component -->
      <SearchBar @search="handleSearch" />

      <button
        @click="showAddModal = true"
        class="p-3 px-5 mb-3 bg-[#007bff] border-none rounded-[50px] text-white text-[1rem] cursor-pointer shadow-md hover:bg-[#0069d9]"
      >
        Add Genre
      </button>

      <!-- Add Genre Modal -->
      <AddGenreModal :showModal="showAddModal" @close="showAddModal = false" />

      <!-- Edit Genre Modal -->
      <EditGenreModal
        :showModal="showEditModal"
        :genre="selectedGenre"
        @close="showEditModal = false"
      />

      <ul class="list-none p-0 px-[8vw] grid grid-cols-3 gap-5">
        <li v-for="genre in filteredGenres" :key="genre.id">
          <h2>{{ genre.name }}</h2>
          <div class="w-full flex justify-center gap-3 mt-5">
            <button
              @click="editGenre(genre)"
              class="w-1/4 p-3 mr-3 mb-3 bg-[#007bff] rounded-[50px] border-none text-white text-[1rem] cursor-pointer shadow-md hover:bg-[#0069d9]"
            >
              Edit
            </button>
            <button
              @click="deleteGenre(genre.id)"
              class="w-1/4 p-3 mb-3 bg-[#dc3545] rounded-[50px] border-none text-white text-[1rem] cursor-pointer shadow-md hover:bg-[#c82333]"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import AddGenreModal from "./AddGenreModal.vue";
import EditGenreModal from "./EditGenreModal.vue";
import SearchBar from "./SearchBar.vue";
import SideBar from "./SideBar.vue";

export default {
  components: {
    AddGenreModal,
    EditGenreModal,
    SearchBar,
    SideBar,
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
