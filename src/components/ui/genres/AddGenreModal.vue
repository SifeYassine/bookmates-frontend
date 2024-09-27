<template>
  <div class="flex justify-center items-center">
    <vs-button @click="active = !active" color="#5208b6">
      Create Genre
    </vs-button>
    <vs-dialog v-model="active" width="20vw">
      <template #header class="mt-6">
        <h4>Add Genre</h4>
      </template>

      <div class="flex flex-col gap-5 items-center">
        <vs-input
          v-model="newGenre.name"
          @keyup.enter="submitForm()"
          type="text"
          color="#5208b6"
          label="Name"
          label-float
          required
          style="width: 326px"
        >
          <template #icon> # </template>
        </vs-input>

        <vs-button @click="submitForm()" class="w-[90%]" color="#5208b6"
          >Add Genre</vs-button
        >
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const active = ref(false);
    const newGenre = ref({ name: "" });
    const store = useStore();

    async function submitForm() {
      try {
        await store.dispatch("addGenre", newGenre.value);
        newGenre.value = { name: "" };
        closeModal();
      } catch (error) {
        console.error("Failed to add genre:", error);
      }
    }

    function closeModal() {
      active.value = false;
    }

    return { active, newGenre, submitForm, closeModal };
  },
};
</script>
