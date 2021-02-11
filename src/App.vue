<template>
  <component :is="active_layout"  :class="theme.primary_background">
    <div id="app">
      <router-view />
    </div>
  </component>
</template>

<script>
import app_layout from "@/layouts/app_layout"
export default {
  name: "App",
  data() {
    return {
      active_layout: app_layout
    };
  }
};
</script>
