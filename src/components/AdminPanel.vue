<template>
  <div>
    <h1>Admin Panel</h1>
    <div class="card-buttons">
      <button class="add-button">Users</button>
      <button class="add-button">Permissions</button>
    </div>

    <UsersList />
  </div>
</template>

<script>
import UsersList from "@/components/UsersList.vue";

export default {
  name: "AdminPanel",
  components: {
    UsersList,
  },
};
</script>
