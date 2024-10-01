<template>
  <div>
    <SideBar />
    <NavBar />
    <AddGenreModal class="mt-[10%]" />
    <GenresList />
  </div>
</template>

<script>
import NavBar from "@/components/ui/cores/NavBar.vue";
import SideBar from "@/components/ui/cores/SideBar.vue";
import AddGenreModal from "@/components/ui/genres/AddGenreModal.vue";
import GenresList from "@/components/ui/genres/GenresList.vue";

export default {
  name: "Genres",
  components: {
    SideBar,
    NavBar,
    AddGenreModal,
    GenresList,
  },
};
</script>
