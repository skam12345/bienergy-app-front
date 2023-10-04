<template>
  <TopNav />
  <div class="app_cont">
    <router-view />
  </div>
  <Footer />
</template>

<script>
import Footer from "@/components/Footer.vue";
import TopNav from "@/components/TopNav.vue";

export default {
  components: {
    Footer,
    TopNav,
  },
};
</script>

<style></style>
