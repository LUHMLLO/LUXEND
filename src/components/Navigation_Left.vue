<template>
  <div class="sidebar p-fixed top left width-50" :class="[theme.background.secondary, theme.color.primary]">
    <div class="sidebar-content">
      <div class="sidebar-section">
        <div class="image-wrapper pt-16 p-x-10">
          <img src="@/assets/logo.png" />
        </div>
      </div>
      <div class="sidebar-section">
        <router-link :to="'/' + route.name" v-for="(route, index) in NewRouteList" :key="index">
          <div class="w-100 p-relative p-16 d-flex justify-center content-center text-center tooltip-wrapper" :class="[theme.color.primary]">
            <i class="font-xl m-auto toggle cursor-pointer" :class="route.meta.icon" />
            <span class="tooltip font-xs right offset-l-16 tangible m-y-auto p-5 z-index-11" :class="[theme.radius, theme.background.secondary]" v-html="route.name" />
          </div>
        </router-link>
      </div>
      <div class="sidebar-section">
        <div class="w-100 p-relative p-16 d-flex justify-center content-center text-center tooltip-wrapper" :class="[theme.color.primary]">
          <i class="font-xl m-auto toggle cursor-pointer uil uil-signout" />
          <span class="tooltip font-xs right offset-l-16 tangible m-y-auto p-5 z-index-11" :class="[theme.radius, theme.background.secondary]" v-html="'Signout'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    NewRouteList() {
      let New_Route = [];
      this.$router.options.routes.forEach(route => {
        switch (route.name) {
          case "Landing":
            break;
          default:
            New_Route.push({ path: route.path, name: route.name, meta: route.meta });
            break;
        }
      });
      return New_Route;
    }
  }
};
</script>
