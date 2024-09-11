<template>
  <div>
    <!-- Edit User Modal -->
    <EditUserModal
      :showModal="showEditModal"
      :user="selectedUser"
      @close="showEditModal = false"
    />

    <ul>
      <li v-for="user in users" :key="user.id">
        <h2>{{ user.username }}</h2>
        <div v-if="getRoleById(user.role_id)">
          <h2>{{ getRoleById(user.role_id).name }}</h2>
        </div>
        <div class="card-buttons">
          <button @click="editUser(user)" class="edit-button">Edit</button>
          <button @click="deleteUser(user.id)" class="delete-button">
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import EditUserModal from "./EditUserModal.vue";

export default {
  components: {
    EditUserModal,
  },
  setup() {
    const store = useStore();
    const users = computed(() => store.state.users);
    const roles = computed(() => store.state.roles);

    const showEditModal = ref(false);
    const selectedUser = ref(null);

    async function fetchUsers() {
      store.dispatch("fetchUsers");
    }

    async function fetchRoles() {
      store.dispatch("fetchRoles");
    }

    async function fetchData() {
      await fetchUsers();
      await fetchRoles();
    }

    async function editUser(user) {
      selectedUser.value = user;
      showEditModal.value = true;
    }

    async function deleteUser(id) {
      try {
        await store.dispatch("deleteUser", id);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }

    onMounted(fetchData);

    function getRoleById(id) {
      return roles.value.find((role) => role.id === id);
    }

    return {
      users,
      getRoleById,
      deleteUser,
      editUser,
      showEditModal,
      selectedUser,
    };
  },
};
</script>
