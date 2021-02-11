<template>
  <div class="sidebar" :class="[theme.secondary_background, theme.primary_color]">
    <div class="sidebar-content">
      <div class="sidebar-section">
        <div class="image-wrapper p-16">
          <img src="@/assets/logo.png" />
        </div>
        <router-link :to="'/'+route.name" v-for="(route, index) in RoutesOnSidebar" :key="index">
          <div class="w-100 p-relative p-16 d-flex justify-center content-center text-center tooltip-wrapper" :class="[theme.primary_color]">
            <i class="font-xl m-auto toggle cursor-pointer" :class="route.icon"/>
            <span class="tooltip font-xs right offset-l-16 tangible m-y-auto p-5" v-html="route.name" />
          </div>
        </router-link>
      </div>
      <div class="sidebar-section">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      RoutesOnSidebar: [
        {
          name: "Dashboard",
          icon: "uil uil-create-dashboard"
        },
        {
          name: "Builder",
          icon: "uil uil-paint-tool"
        },
        {
          name: "Settings",
          icon: "uil uil-settings"
        }
      ]
    };
  }
};
</script>
