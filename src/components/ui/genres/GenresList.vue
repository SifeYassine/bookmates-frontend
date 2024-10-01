<template>
  <ul
    class="GenresList w-3/4 ml-[22%] mt-[2%] rounded-2xl z-[1000] bg-white grid grid-cols-6 gap-y-2.5 list-none p-[50px]"
  >
    <li
      v-for="genre in filteredGenres"
      :key="genre.id"
      @click="onGenreClick(genre)"
      class="font-bold p-1.5"
    >
      <div>
        <vs-button class="w-[85%]" color="#5208b6">
          <i class="bx bx-tag text-[15px]" />
          <p class="text-[15px] ml-[5px]">{{ genre.name }}</p></vs-button
        >
      </div>
    </li>
  </ul>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
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

<style scoped>
.GenresList {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
