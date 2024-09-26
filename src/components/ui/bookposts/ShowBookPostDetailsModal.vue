<template>
  <vs-dialog v-model="active" width="400px" not-center>
    <template #header>
      <h2>{{ bookPost.id }}</h2>
      <h2>{{ bookPost.offeredBook_id }}</h2>
      <h2>{{ bookPost.wishedBook_id }}</h2>
    </template>
  </vs-dialog>
</template>

<script>
export default {
  name: "ShowBookPostDetailsModal",
  props: {
    bookPost: {
      type: Object,
      required: true,
    },
  },
};
</script>
