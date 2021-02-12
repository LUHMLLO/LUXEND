<template>
  <div id="app_layout" class="row vh:h-1000 overflow-hidden">
    <div class="width-50 flex-grow-0 flex-shrink-1 vh:h-1000">
      <Sidebar />
    </div>
    <div class="w-0 flex-grow-1 flex-shrink-0 vh:h-1000 overflow-hidden overflow-y-scroll scrollbar-none">
      <div class="w-100 pb-50" :class="builderMode">
        <Navbar :class="hideNavbar" />
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app_layout",
  components: {
    Sidebar: () => import("@/components/Sidebar"),
    Navbar: () => import("@/components/Navbar")
  },
  computed: {
    hideNavbar() {
      return {
        "d-none": this.$route.name == "Builder"
      };
    },
    builderMode() {
      return {
        "container p-y-50": this.$route.name !== "Builder"
      };
    }
  }
};
</script>
