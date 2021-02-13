<template>
  <div id="landing" class="vh:h-1000 overflow-hidden overflow-y-scroll scrollbar-none">
    <div class="w-100 d-block sm:d-none">
      <Navbar />
    </div>
    <div class="w-100 d-none sm:d-block">
      <Sidebar />
    </div>
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
    Sidebar: () => import("./components/Sidebar"),
    Header: () => import("./components/Header"),
    Content: () => import("./components/Content"),
    Footer: () => import("./components/Footer")
  }
};
</script>
