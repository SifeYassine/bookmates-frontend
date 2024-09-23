<template>
  <div class="flex justify-center items-center">
    <vs-button @click="active = !active">Create Book Post</vs-button>
    <vs-dialog v-model="active" width="50vw" overlay-blur>
      <template #header>
        <h3>Create Book Exchange Post</h3>
      </template>

      <!-- Step 1: Input Offered Book -->
      <div v-if="currentStep === 1" class="step">
        <h4>Step 1: Offered Book Details</h4>
        <vs-input
          v-model="offeredBook.title"
          label="Title"
          label-float
          required
          color="primary"
        />
        <vs-input
          v-model="offeredBook.author"
          label="Author"
          label-float
          required
          color="primary"
        />
        <vs-input
          v-model="offeredBook.description"
          label="Description"
          label-float
          required
          color="primary"
        />
        <div class="flex" style="margin-top: 20px">
          <div v-if="offeredBook.cover_image_preview" class="image-preview">
            <img
              :src="offeredBook.cover_image_preview"
              alt="Preview"
              class="preview-image"
            />
            <button class="remove-button" @click="removeImage('offered')">
              X
            </button>
          </div>
          <div class="file-upload-wrapper">
            <input
              type="file"
              ref="offeredFileInput"
              class="hidden-input"
              @change="onCoverImageChange($event, 'offered')"
              accept="image/*"
            />
            <vs-button @click="triggerFileInput('offered')">
              Choose File
            </vs-button>
            <span>{{
              offeredBook.cover_image
                ? offeredBook.cover_image.name
                : "No File Chosen"
            }}</span>
          </div>
        </div>

        <vs-input
          v-model="offeredBook.page_count"
          type="number"
          label="Page Count"
          label-float
          required
          color="primary"
        />
        <vs-input
          v-model="offeredBook.published_year"
          type="number"
          label="Published Year"
          label-float
          required
          color="primary"
        />
        <vs-input
          v-model="offeredBook.isbn"
          label="ISBN"
          label-float
          required
          color="primary"
        />
        <div class="center con-selects">
          <vs-select
            v-model="offeredBook.genre_id"
            label="Genre"
            label-float
            required
            color="primary"
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

        <vs-button @click="handleOfferedBookNextStep">Next</vs-button>
      </div>

      <!-- Step 2: Input Wished Book -->
      <div v-if="currentStep === 2" class="step">
        <h4>Step 2: Wished Book Details</h4>
        <vs-input
          v-model="wishedBook.title"
          label="Title"
          label-float
          required
          color="primary"
        />
        <vs-input
          v-model="wishedBook.author"
          label="Author"
          label-float
          required
          color="primary"
        />
        <vs-input
          v-model="wishedBook.description"
          label="Description"
          label-float
          required
          color="primary"
        />

        <div class="flex" style="margin-top: 20px">
          <div v-if="wishedBook.cover_image_preview" class="image-preview">
            <img
              :src="wishedBook.cover_image_preview"
              alt="Preview"
              class="preview-image"
            />
            <button class="remove-button" @click="removeImage('wished')">
              X
            </button>
          </div>
          <div class="file-upload-wrapper">
            <input
              type="file"
              ref="wishedFileInput"
              class="hidden-input"
              @change="onCoverImageChange($event, 'wished')"
              accept="image/*"
            />
            <vs-button @click="triggerFileInput('wished')">
              Choose File
            </vs-button>
            <span>{{
              wishedBook.cover_image
                ? wishedBook.cover_image.name
                : "No File Chosen"
            }}</span>
          </div>
        </div>

        <vs-input
          v-model="wishedBook.page_count"
          type="number"
          label="Page Count"
          label-float
          required
          color="primary"
        />
        <vs-input
          v-model="wishedBook.published_year"
          type="number"
          label="Published Year"
          label-float
          required
          color="primary"
        />
        <vs-input
          v-model="wishedBook.isbn"
          label="ISBN"
          label-float
          required
          color="primary"
        />
        <div class="center con-selects">
          <vs-select
            v-model="wishedBook.genre_id"
            label="Genre"
            label-float
            required
            color="primary"
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
          <vs-button @click="goToPreviousStep"> Previous </vs-button>
          <vs-button @click="handleWishedBookNextStep"> Next </vs-button>
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
          <vs-button @click="goToPreviousStep"> Previous </vs-button>
          <vs-button @click="submitForm"> Submit </vs-button>
        </div>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const active = ref(false);
    const currentStep = ref(1);
    const offeredFileInput = ref(null);
    const wishedFileInput = ref(null);
    const store = useStore();
    const genres = computed(() => store.state.genres);
    const userId = computed(() => store.getters.userId);
    const books = computed(() => store.state.books);

    const offeredBook = ref({
      title: "",
      author: "",
      description: "",
      cover_image: null,
      page_count: null,
      published_year: null,
      isbn: null,
      genre_id: null,
      user_id: null,
    });
    const wishedBook = ref({
      title: "",
      author: "",
      description: "",
      cover_image: null,
      page_count: null,
      published_year: null,
      isbn: null,
      genre_id: null,
      user_id: null,
    });

    const selectedOfferedBook = ref(null);
    const selectedWishedBook = ref(null);

    async function fetchGenres() {
      await store.dispatch("fetchGenres");
    }

    async function fetchBooks() {
      await store.dispatch("fetchBooks");
    }

    async function fetchData() {
      await fetchGenres();
      await fetchBooks();
    }

    async function submitOfferedBook() {
      offeredBook.value.user_id = userId.value;
      await store.dispatch("addBook", offeredBook.value);
      return books.value;
    }

    async function submitWishedBook() {
      wishedBook.value.user_id = userId.value;
      await store.dispatch("addBook", wishedBook.value);
      return books.value;
    }

    function goToNextStep() {
      currentStep.value++;
    }

    function goToPreviousStep() {
      currentStep.value--;
    }

    function closeModal() {
      active.value = false;
    }

    async function handleOfferedBookNextStep() {
      await submitOfferedBook();
      console.log("book list next", books.value);
      goToNextStep();
    }

    async function handleWishedBookNextStep() {
      await submitWishedBook();
      console.log("book list next", books.value);
      goToNextStep();
    }

    function onCoverImageChange(event, type) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (type === "offered") {
          offeredBook.value.cover_image = file;
          offeredBook.value.cover_image_preview = event.target.result;
        } else {
          wishedBook.value.cover_image = file;
          wishedBook.value.cover_image_preview = event.target.result;
        }
      };

      reader.readAsDataURL(file);
    }

    function triggerFileInput(type) {
      if (type === "offered") {
        offeredFileInput.value.click();
      } else if (type === "wished") {
        wishedFileInput.value.click();
      }
    }

    function removeImage(type) {
      if (type === "offered") {
        offeredBook.value.cover_image = null;
        offeredBook.value.cover_image_preview = null;
      } else {
        wishedBook.value.cover_image = null;
        wishedBook.value.cover_image_preview = null;
      }
    }

    async function submitForm() {
      try {
        await store.dispatch("addBookPost", {
          offeredBook_id: selectedOfferedBook.value,
          wishedBook_id: selectedWishedBook.value,
          offerer_id: userId.value,
        });
        closeModal();
      } catch (error) {
        console.error("Failed to submit book post:", error);
      }
    }

    async function loggedUser() {
      await store.dispatch("loggedUser");
    }

    onMounted(fetchData);
    onMounted(loggedUser);

    return {
      active,
      currentStep,
      offeredFileInput,
      wishedFileInput,
      genres,
      userId,
      books,
      offeredBook,
      wishedBook,
      selectedOfferedBook,
      selectedWishedBook,
      goToPreviousStep,
      closeModal,
      handleOfferedBookNextStep,
      handleWishedBookNextStep,
      onCoverImageChange,
      triggerFileInput,
      removeImage,
      submitForm,
    };
  },
};
</script>

<style scoped>
.file-upload-wrapper {
  margin: 1rem 0;
  padding: 1rem 10px;
  width: fit-content;
  display: flex;
  align-items: center;
  background-color: #f4f7f8;
  border-radius: 10px;
  border: 2px solid #e2e4e5;
}

.hidden-input {
  display: none;
}

.image-preview {
  position: relative;
  display: inline-block;
  margin-right: 1rem;
}

.preview-image {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border-radius: 10px;
}

.remove-button {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.remove-button:hover {
  background-color: darkred;
}

span {
  margin: 0 0.5rem;
}
</style>
