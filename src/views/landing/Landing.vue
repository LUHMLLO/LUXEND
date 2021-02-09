<template>
  <div id="landing" :class="theme.primary_background">
    <Navbar />
    <Header />
    <Content />
    <Footer />
  </div>
</template>

<script>
export default {
  name: "Landing",
  components: {
    Navbar: () => import("./components/Navbar"),
    Header: () => import("./components/Header"),
    Content: () => import("./components/Content"),
    Footer: () => import("./components/Footer")
  }
};
</script>
