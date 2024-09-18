<template>
  <div>
    <NavBar />
    <SideBar />

    <AddGenreModal class="add-genre-modal" />
    <GenreLists />
  </div>
</template>

<script>
import "@/assets/style.css";
import "@/assets/globalStyle.css";
import NavBar from "@/components/ui/cores/NavBar.vue";
import SideBar from "@/components/ui/cores/SideBar.vue";
import AddGenreModal from "@/components/ui/genres/AddGenreModal.vue";
import GenreLists from "@/components/ui/genres/GenresList.vue";

export default {
  name: "Genres",
  components: {
    NavBar,
    SideBar,
    AddGenreModal,
    GenreLists,
  },
};
</script>

<style scoped>
.add-genre-modal {
  margin-top: 10%;
}
</style>
