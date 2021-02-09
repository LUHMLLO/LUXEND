<template>
  <div id="landing">
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
