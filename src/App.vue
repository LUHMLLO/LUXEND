<template>
  <component id="app" :is="setLayout" :class="theme.background.primary">
    <router-view />
    <Notification />
  </component>
</template>

<script>
import app_layout from "@/layouts/app_layout";
export default {
  name: "App",
  components: {
    Notification: () => import("@/components/Notification")
  },
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

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&family=Source+Sans+Pro&display=swap");

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Source Sans Pro", sans-serif !important;
}
p,
a,
ul,
li,
span,
small,
ol,
button {
  font-family: "Roboto", sans-serif !important;
}
</style>
