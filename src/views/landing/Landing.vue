<template>
  <div id="landing" class="vh:h-1000 overflow-hidden overflow-y-scroll scrollbar-none">
    <Header />
    <Content />
    <Footer />
  </div>
</template>

<script>
export default {
  name: "Landing",
  components: {
    Header: () => import("./components/Header"),
    Content: () => import("./components/Content"),
    Footer: () => import("./components/Footer")
  }
};
</script>
