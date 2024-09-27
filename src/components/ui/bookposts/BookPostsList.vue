<template>
  <div>
    <ShowBookPostDetailsModal v-model="active" :bookPost="selectedBookPost" />
    <ul
      class="list list-none p-0 px-[8vw] grid gap-5"
      style="grid-template-columns: repeat(5, 1fr)"
    >
      <li v-for="bookPost in filteredBookPosts" :key="bookPost.id">
        <div
          v-if="bookPost.offeredBook"
          @click="getSelectedBookPost(bookPost.id)"
          class="flex flex-col items-center cursor-pointer"
        >
          <vs-card>
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
                <span class="span" style="margin-left: 5px">
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

export default {
  components: {
    ShowBookPostDetailsModal,
  },
  setup() {
    const active = ref(false);
    const store = useStore();
    const bookPosts = computed(() => store.getters.getBooks);
    const searchQuery = computed(() => store.state.searchQuery);
    const selectedBookPost = computed(() => store.getters.getBookPost);

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
      await Promise.all([
        store.dispatch("fetchBookPosts"),
        store.dispatch("fetchBooks"),
      ]);
    }

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
  margin: 2% 0 0 22%;
  border-radius: 20px;
  border: 1px solid red;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

img {
  height: 240px;
  padding: 10px;
  object-fit: cover;
  border-radius: 10px;
}
</style>
