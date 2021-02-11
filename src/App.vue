<template>
  <component id="app" :is="setLayout" :class="theme.primary_background">
    <router-view />
  </component>
</template>

<script>
import app_layout from "@/layouts/app_layout";
export default {
  name: "App",
  data() {
    return {
      active_layout: app_layout
    };
  },
  computed: {
    setLayout() {
      if (this.$route.name == "Landing") {
        return "div";
      }
      return this.active_layout;
    }
  }
};
</script>
