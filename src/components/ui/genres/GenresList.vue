<template>
  <div class="list flex border-red-500 border-2">
    <div>
      <!-- Edit Genre Modal -->
      <EditGenreModal
        :showModal="showEditModal"
        :genre="selectedGenre"
        @close="showEditModal = false"
      />

      <ul
        class="w-full list-none p-0 px-[8vw] grid gap-5"
        style="grid-template-columns: repeat(6, 1fr)"
      >
        <li v-for="genre in filteredGenres" :key="genre.id">
          <h2>{{ genre.name }}</h2>
          <!-- <div class="w-full flex justify-center gap-3 mt-5">
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
          </div> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import EditGenreModal from "./EditGenreModal.vue";

export default {
  components: {
    EditGenreModal,
  },
  setup() {
    const store = useStore();
    const genres = computed(() => store.state.genres);

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
      showEditModal,
      selectedGenre,
      handleSearch,
    };
  },
};
</script>

<style scoped>
.list {
  width: 75%;
  margin: 10% 0 0 22%;
  border-radius: 20px;
  border: 1px solid red;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
