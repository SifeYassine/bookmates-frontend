<template>
  <ul
    class="w-3/4 ml-[22%] mt-[2%] rounded-2xl border border-red-500 z-[1000] bg-white shadow-md grid grid-cols-6 gap-y-2.5 list-none p-0 px-[8vw]"
  >
    <li
      v-for="genre in filteredGenres"
      :key="genre.id"
      @click="onGenreClick(genre)"
      class="w-[90%] flex justify-center items-center border-2 border-[#5208b6] text-[#5208b6] text-xl font-bold rounded-lg p-1.5 cursor-pointer"
    >
      <div>
        <h2>{{ genre.name }}</h2>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed, onMounted } from "vue";
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

    const genres = computed(() => store.getters.getGenres);
    const searchQuery = computed(() => store.state.searchQuery);

    async function fetchGenres() {
      try {
        await store.dispatch("fetchGenres");
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    }

    const filteredGenres = computed(() => {
      const searchFilter = searchQuery.value.toLowerCase();

      if (!searchFilter) {
        return genres.value;
      }

      return genres.value.filter((genre) =>
        genre.name.toLowerCase().includes(searchFilter)
      );
    });

    function onGenreClick(genre) {
      router.push({ path: "/book_posts", query: { genre: genre.name } });
    }

    onMounted(fetchGenres);

    return {
      filteredGenres,
      onGenreClick,
    };
  },
};
</script>
