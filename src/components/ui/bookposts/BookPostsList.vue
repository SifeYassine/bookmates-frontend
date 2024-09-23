<template>
  <ul
    class="list list-none p-0 px-[8vw] grid gap-5"
    style="grid-template-columns: repeat(5, 1fr)"
  >
    <li v-for="bookPost in filteredBookPosts" :key="bookPost.id">
      <div v-if="bookPost.offeredBook" class="flex flex-col items-center">
        <img
          :src="`${baseURL}${bookPost.offeredBook.cover_image}`"
          alt="Book cover"
        />
        <h2>{{ bookPost.offeredBook.title }}</h2>
        <p>By {{ bookPost.offeredBook.author }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const bookPosts = computed(() => store.getters.getBooks);
    const searchQuery = computed(() => store.state.searchQuery);

    const baseURL = "http://127.0.0.1:8000";

    const filteredBookPosts = computed(() => {
      if (!searchQuery.value) {
        return bookPosts.value;
      }
      return bookPosts.value.filter((bookPost) =>
        bookPost.offeredBook.title
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
      );
    });

    async function fetchData() {
      // Fetch both bookPosts and books in parallel
      await Promise.all([
        store.dispatch("fetchBookPosts"),
        store.dispatch("fetchBooks"),
      ]);
    }

    onMounted(fetchData);

    return {
      baseURL,
      bookPosts,
      searchQuery,
      filteredBookPosts,
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

img {
  width: 100px;
  object-fit: cover;
  border-radius: 10px;
}
</style>
