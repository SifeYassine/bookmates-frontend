<template>
  <vs-dialog width="550px" not-center>
    <template #header>
      <h2 class="text-2xl text-gray-800">Book Post Details</h2>
    </template>
    <div v-if="bookPost && bookPost.offeredBook" class="p-5">
      <div class="flex mb-5">
        <img
          :src="`${baseURL}${bookPost.offeredBook.cover_image}`"
          alt="Book cover"
          class="w-[120px] h-auto object-cover mr-5 rounded-2xl"
        />
        <div class="flex-1">
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
      <div v-if="bookPost.wishedBook" class="border-t border-gray-200 pt-5">
        <h4 class="text-gray-800 mt-0">Wished Book</h4>
        <img
          :src="`${baseURL}${bookPost.wishedBook.cover_image}`"
          alt="Book cover"
          class="w-20 h-auto object-cover mr-5 rounded-lg"
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
