<template>
  <div>
    <ShowBookPostDetailsModal v-model="active" :bookPost="selectedBookPost" />
    <ul
      class="list list-none grid gap-4"
      style="grid-template-columns: repeat(5, 1fr)"
    >
      <li v-for="bookPost in filteredBookPosts" :key="bookPost.id">
        <div
          v-if="bookPost.offeredBook"
          @click="getSelectedBookPost(bookPost.id)"
          class="flex flex-col items-center cursor-pointer"
        >
          <vs-card
            style="width: 110%; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)"
          >
            <template #title>
              <h2>{{ bookPost.offeredBook.title }}</h2>
            </template>
            <template #img>
              <img
                :src="`${baseURL}${bookPost.offeredBook.cover_image}`"
                alt="Book cover"
              />
            </template>
            <template #text>
              <p>By {{ bookPost.offeredBook.author }}</p>
            </template>
            <template #interactions>
              <vs-button color="#5208b6">
                <i class="bx bx-tag" />
                <span
                  v-if="bookPost.offeredBook.genre"
                  class="span"
                  style="margin-left: 5px"
                >
                  {{ bookPost.offeredBook.genre.name }}
                </span>
              </vs-button>
              <vs-button color="primary" icon>
                <i class="bx bx-bookmark" />
              </vs-button>
            </template>
          </vs-card>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ShowBookPostDetailsModal from "./ShowBookPostDetailsModal.vue";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  components: {
    ShowBookPostDetailsModal,
  },
  setup() {
    const active = ref(false);
    const store = useStore();
    const route = useRoute();

    const bookPosts = computed(() => store.getters.getBookPosts);
    const selectedBookPost = computed(() => store.getters.getBookPost);
    const searchQuery = computed(() => store.state.searchQuery);
    const genreName = ref(route.query.genre || "");

    const baseURL = "http://127.0.0.1:8000";

    async function fetchData() {
      try {
        await store.dispatch("fetchGenres");
        await store.dispatch("loggedUser");
        await store.dispatch("fetchBooks");
        await store.dispatch("fetchBookPosts");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    const filteredBookPosts = computed(() => {
      const searchFilter = searchQuery.value.toLowerCase();
      const genreFilter = genreName.value.toLowerCase();

      if (!searchFilter && !genreFilter) {
        return bookPosts.value;
      }

      return bookPosts.value.filter((bookPost) => {
        return (
          bookPost.offeredBook.title.toLowerCase().includes(searchFilter) &&
          bookPost.offeredBook.genre.name.toLowerCase().includes(genreFilter)
        );
      });
    });

    async function getSelectedBookPost(id) {
      await store.dispatch("getBookPostById", id);
      active.value = true;
    }

    onMounted(fetchData);

    return {
      baseURL,
      bookPosts,
      searchQuery,
      filteredBookPosts,
      selectedBookPost,
      active,
      getSelectedBookPost,
    };
  },
};
</script>

<style scoped>
.list {
  padding: 20px 60px;
  margin-left: 18.5%;
  border-radius: 20px;
  z-index: 1000;
}

img {
  height: 240px;
  padding: 20px;
  object-fit: fill;
  border-radius: 30px !important;
}
</style>
