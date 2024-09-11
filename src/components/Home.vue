<template>
  <div>
    <Hero />
    <Footer />
  </div>
</template>

<script>
import "@/assets/style.css";
import "@/assets/globalStyle.css";
import Hero from "@/components/Hero.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Hero,
    Footer,
  },
};
</script>
