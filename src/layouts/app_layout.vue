<template>
  <div id="app_layout" class="vh:h-1000 overflow-hidden overflow-y-scroll overscroll-contain sm:p-y-50">
    <Navbar class="d-none sm:d-flex" />
    <div class="pb-50" :class="[builderMode]">
      <slot />
    </div>
    <NavigationLeft class="sm:d-none" />
    <NavigationBottom class="d-none sm:d-block" />
  </div>
</template>

<script>
export default {
  name: "app_layout",
  components: {
    Navbar: () => import("@/components/Navbar"),
    NavigationLeft: () => import("@/components/Navigation_Left"),
    NavigationBottom: () => import("@/components/Navigation_Bottom")
  },
  computed: {
    builderMode() {
      return {
        " container ": this.$route.name !== "Builder"
      };
    }
  }
};
</script>
