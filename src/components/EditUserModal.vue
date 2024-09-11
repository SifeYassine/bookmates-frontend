<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Edit User</h3>
      <form @submit.prevent="submitForm" class="edit-form">
        <button type="button" @click="closeModal" class="close-button">
          ✖️
        </button>

        <input
          type="number"
          placeholder="Role ID"
          v-model="userInfo.role_id"
          id="role_id"
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
    user: Object,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const store = useStore();
    const userInfo = ref(props.user);

    // Watch for changes and update userInfo
    watchEffect(() => {
      userInfo.value = props.user;
    });

    async function submitForm() {
      try {
        await store.dispatch("updateUser", userInfo.value);
        emit("close");
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    }

    function closeModal() {
      emit("close");
    }

    return { userInfo, submitForm, closeModal };
  },
};
</script>
