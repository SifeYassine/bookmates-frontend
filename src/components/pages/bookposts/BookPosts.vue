<template>
  <div>
    <SideBar />
    <NavBar />
    <AddBookPostModal class="add-genre-modal" />
    <BookPostsList />
  </div>
</template>

<script>
import NavBar from "@/components/ui/cores/NavBar.vue";
import SideBar from "@/components/ui/cores/SideBar.vue";
import AddBookPostModal from "@/components/ui/bookposts/AddBookPostModal.vue";
import BookPostsList from "@/components/ui/bookposts/BookPostsList.vue";

export default {
  name: "BookPosts",
  components: {
    SideBar,
    NavBar,
    AddBookPostModal,
    BookPostsList,
  },
};
</script>

<style scoped>
.add-genre-modal {
  margin-top: 10%;
}
</style>
