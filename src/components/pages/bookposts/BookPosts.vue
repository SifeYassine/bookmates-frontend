<template>
  <div>
    <SideBar />
    <NavBar />
    <BookPostsList />
  </div>
</template>

<script>
import NavBar from "@/components/ui/cores/NavBar.vue";
import SideBar from "@/components/ui/cores/SideBar.vue";
import BookPostsList from "@/components/ui/bookposts/BookPostsList.vue";

export default {
  name: "BookPosts",
  components: {
    SideBar,
    NavBar,
    BookPostsList,
  },
};
</script>

<style scoped>
.add-genre-modal {
  margin-top: 10%;
}
</style>
