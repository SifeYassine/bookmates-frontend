<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Add Genre</h3>
      <form @submit.prevent="submitForm" class="add-form">
        <button type="button" @click="closeModal" class="close-button">
          ✖️
        </button>

        <input
          type="text"
          placeholder="Name"
          v-model="newGenre.name"
          id="name"
          required
          class="input-field"
        />

        <button type="submit" class="submit-button">Add Genre</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    showModal: Boolean,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const store = useStore();
    const newGenre = ref({ name: "" });

    async function submitForm() {
      try {
        await store.dispatch("addGenre", newGenre.value);
        // Clear the form
        newGenre.value = { name: "" };
        // Close modal
        emit("close");
      } catch (error) {
        console.error("Failed to add genre:", error);
      }
    }

    function closeModal() {
      emit("close");
    }

    return { newGenre, submitForm, closeModal };
  },
};
</script>
