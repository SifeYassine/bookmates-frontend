<template>
  <vs-dialog width="550px" not-center>
    <template #header>
      <h2 class="dialog-title">Book Post Details</h2>
    </template>
    <div v-if="bookPost && bookPost.offeredBook" class="dialog-content">
      <div class="book-info">
        <img
          :src="`${baseURL}${bookPost.offeredBook.cover_image}`"
          alt="Book cover"
          class="book-cover"
        />
        <div class="book-details">
          <p><strong>Title:</strong> {{ bookPost.offeredBook.title }}</p>
          <p><strong>Author:</strong> {{ bookPost.offeredBook.author }}</p>
          <p>
            <strong>Description:</strong> {{ bookPost.offeredBook.description }}
          </p>
          <p>
            <strong>Genre:</strong>
            {{
              bookPost.offeredBook.genre
                ? bookPost.offeredBook.genre.name
                : "N/A"
            }}
          </p>
        </div>
      </div>
      <div v-if="bookPost.wishedBook" class="wished-book">
        <h4>Wished Book</h4>
        <img
          :src="`${baseURL}${bookPost.wishedBook.cover_image}`"
          alt="Book cover"
          class="book-cover2"
        />
        <p><strong>Title:</strong> {{ bookPost.wishedBook.title }}</p>
        <p><strong>Author:</strong> {{ bookPost.wishedBook.author }}</p>
        <p>
          <strong>Genre:</strong>
          {{
            bookPost.wishedBook.genre ? bookPost.wishedBook.genre.name : "N/A"
          }}
        </p>
      </div>
    </div>
  </vs-dialog>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "ShowBookPostDetailsModal",
  props: {
    active: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const bookPost = computed(() => store.getters.getBookPost);
    const baseURL = "http://127.0.0.1:8000";

    return {
      bookPost,
      baseURL,
    };
  },
};
</script>

<style scoped>
.dialog-title {
  font-size: 1.5rem;
  color: #333;
}

.dialog-content {
  padding: 20px;
}

.book-info {
  display: flex;
  margin-bottom: 20px;
}

.book-cover {
  width: 120px;
  height: auto;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 20px;
}

.book-cover2 {
  width: 80px;
  height: auto;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 10px;
}

.book-details {
  flex: 1;
}

.book-details h3 {
  margin-top: 0;
  color: #333;
}

.wished-book {
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.wished-book h4 {
  margin-top: 0;
  color: #333;
}
</style>
