<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Edit Genre</h3>
      <form @submit.prevent="submitForm" class="edit-form">
        <button type="button" @click="closeModal" class="close-button">
          ✖️
        </button>

        <input
          type="text"
          placeholder="Name"
          v-model="genreInfo.name"
          id="name"
          required
          class="input-field"
        />
        <button type="submit" class="submit-button">Save Changes</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    showModal: Boolean,
    genre: Object,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const store = useStore();
    const genreInfo = ref(props.genre);

    // Watch for changes and update genreInfo
    watchEffect(() => {
      genreInfo.value = props.genre;
    });

    async function submitForm() {
      try {
        await store.dispatch("updateGenre", genreInfo.value);
        emit("close");
      } catch (error) {
        console.error("Failed to update genre:", error);
      }
    }

    function closeModal() {
      emit("close");
    }

    return { genreInfo, submitForm, closeModal };
  },
};
</script>
