<template>
  <div id="app_layout" class="row vh:h-1000 overflow-hidden">
    <div class="width-50 flex-grow-0 flex-shrink-1 vh:h-1000" :class="hideSidebar">
      <Sidebar />
    </div>
    <div class="w-0 flex-grow-1 flex-shrink-0 vh:h-1000 overflow-hidden overflow-y-scroll scrollbar-none">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "app_layout",
  components: {
    Sidebar: () => import("@/components/Sidebar")
  },
  computed: {
    hideSidebar: function() {
      return {
        "d-none": this.$route.name == "Landing"
      };
    }
  }
};
</script>

<style scoped>
.w-auto {
  width: auto !important;
}
</style>
