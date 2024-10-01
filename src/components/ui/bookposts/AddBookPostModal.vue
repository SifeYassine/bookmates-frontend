<template>
  <div class="flex justify-center items-center ml-[16%] mb-[20px]">
    <vs-button @click="active = !active" color="#5208b6">
      Create Book Post
    </vs-button>
    <vs-dialog v-model="active" width="20vw">
      <template #header>
        <h3>Create Book Exchange Post</h3>
      </template>

      <!-- Multi Step Progressive Form -->
      <div v-if="currentStep <= 2" class="step">
        <h4>
          Step {{ currentStep }}:
          {{ currentStep === 1 ? "Offered" : "Wished" }} Book Details
        </h4>

        <vs-input
          v-model="currentBook.title"
          label="Title"
          label-float
          required
          color="#5208b6"
          class="w-[350px]"
        />
        <vs-input
          v-model="currentBook.author"
          label="Author"
          label-float
          required
          color="#5208b6"
          class="w-[350px]"
        />
        <vs-input
          v-model="currentBook.description"
          label="Description"
          label-float
          required
          color="#5208b6"
          class="w-[350px]"
        />

        <!-- Image Upload -->
        <div class="flex mt-5">
          <div
            v-if="currentBook.cover_image_preview"
            class="relative inline-block mr-4 mt-2.5"
          >
            <img
              :src="currentBook.cover_image_preview"
              alt="Preview"
              class="max-w-[100px] max-h-[100px] object-cover rounded-lg"
            />
            <button
              class="absolute -top-1 -right-1 bg-red-500 hover:bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer"
              @click="removeImage"
            >
              X
            </button>
          </div>
          <div
            class="my-4 px-2.5 py-4 w-fit flex items-center bg-gray-100 rounded-lg border-2 border-gray-200"
          >
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              @change="onCoverImageChange($event)"
              accept="image/*"
            />
            <vs-button @click="triggerFileInput" color="#5208b6"
              >Choose File</vs-button
            >
            <span class="mx-2">{{
              currentBook.cover_image
                ? currentBook.cover_image.name
                : "No File Chosen"
            }}</span>
          </div>
        </div>

        <vs-input
          v-model="currentBook.page_count"
          type="number"
          label="Page Count"
          label-float
          required
          color="#5208b6"
          class="w-[350px]"
        />
        <vs-input
          v-model="currentBook.published_year"
          type="number"
          label="Published Year"
          label-float
          required
          color="#5208b6"
          class="w-[350px]"
        />
        <vs-input
          v-model="currentBook.isbn"
          label="ISBN"
          label-float
          required
          color="#5208b6"
          class="w-[350px]"
        />
        <div class="center con-selects">
          <vs-select
            v-model="currentBook.genre_id"
            label="Genre"
            label-float
            required
            color="#5208b6"
          >
            <vs-option
              v-for="genre in genres"
              :label="genre.name"
              :key="genre.id"
              :value="genre.id"
            >
              {{ genre.name }}
            </vs-option>
          </vs-select>
        </div>

        <div class="flex gap-10 justify-center">
          <vs-button
            v-if="currentStep > 1"
            @click="goToPreviousStep"
            color="#5208b6"
            >Previous</vs-button
          >
          <vs-button @click="submitCurrentBookAndNextStep" color="#5208b6"
            >Next</vs-button
          >
        </div>
      </div>

      <!-- Step 3: Review and Confirm -->
      <div v-if="currentStep === 3" class="step">
        <h4>Step 3: Review and Confirm</h4>
        <p>Select which book to offer and which to wish:</p>

        <vs-select
          v-model="selectedOfferedBook"
          label="Select Offered Book"
          label-float
        >
          <vs-option
            v-for="book in books"
            :label="book.title"
            :key="book.id"
            :value="book.id"
          >
            {{ book.title }} by {{ book.author }}
          </vs-option>
        </vs-select>

        <vs-select
          v-model="selectedWishedBook"
          label="Select Wished Book"
          label-float
        >
          <vs-option
            v-for="book in books"
            :label="book.title"
            :key="book.id"
            :value="book.id"
          >
            {{ book.title }} by {{ book.author }}
          </vs-option>
        </vs-select>

        <div class="flex gap-10 justify-center">
          <vs-button @click="goToPreviousStep" color="#5208b6">
            Previous
          </vs-button>
          <vs-button @click="submitForm" color="#5208b6">Submit</vs-button>
        </div>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const active = ref(false);
    const currentStep = ref(1);
    const store = useStore();
    const genres = computed(() => store.getters.getGenres);
    const books = computed(() => store.getters.getBooks);
    const userId = computed(() => store.getters.userId);

    const bookInfo = {
      title: "",
      author: "",
      description: "",
      cover_image: null,
      cover_image_preview: null,
      page_count: null,
      published_year: null,
      isbn: null,
      genre_id: null,
      user_id: null,
    };

    const offeredBook = ref({ ...bookInfo });
    const wishedBook = ref({ ...bookInfo });

    const currentBook = computed(() => {
      return currentStep.value === 1 ? offeredBook.value : wishedBook.value;
    });

    const selectedOfferedBook = ref(null);
    const selectedWishedBook = ref(null);

    async function submitCurrentBook(currentBook) {
      currentBook.value.user_id = userId.value;
      await store.dispatch("addBook", currentBook.value);
      return books.value;
    }

    function goToNextStep() {
      currentStep.value++;
    }

    function goToPreviousStep() {
      currentStep.value--;
    }

    async function submitCurrentBookAndNextStep() {
      await submitCurrentBook(currentBook);
      goToNextStep();
    }

    function onCoverImageChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        currentBook.value.cover_image = file;
        currentBook.value.cover_image_preview = event.target.result;
      };

      reader.readAsDataURL(file);
    }

    function triggerFileInput() {
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.click();
      }
    }

    function removeImage() {
      currentBook.value.cover_image = null;
      currentBook.value.cover_image_preview = null;
    }

    function resetForm() {
      offeredBook.value = { ...bookInfo };
      wishedBook.value = { ...bookInfo };

      selectedOfferedBook.value = null;
      selectedWishedBook.value = null;

      currentStep.value = 1;
    }

    async function submitForm() {
      try {
        await store.dispatch("addBookPost", {
          offeredBook_id: selectedOfferedBook.value,
          wishedBook_id: selectedWishedBook.value,
          offerer_id: userId.value,
        });

        // Refresh the book posts list
        await store.dispatch("fetchBookPosts");

        active.value = false;
        // Reset the form
        resetForm();
      } catch (error) {
        console.error("Failed to submit book post:", error);
      }
    }

    return {
      active,
      currentStep,
      genres,
      books,
      currentBook,
      submitCurrentBook,
      submitCurrentBookAndNextStep,
      goToNextStep,
      goToPreviousStep,
      onCoverImageChange,
      triggerFileInput,
      removeImage,
      submitForm,
      resetForm,
      selectedOfferedBook,
      selectedWishedBook,
    };
  },
};
</script>
