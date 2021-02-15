<template>
  <div class="sidebar p-fixed top left width-50" :class="[theme.secondary_background, theme.primary_color]">
    <div class="sidebar-content">
      <div class="sidebar-section">
        <div class="image-wrapper pt-16 p-x-10">
          <img src="@/assets/logo.png" />
        </div>
      </div>
      <div class="sidebar-section">
        <router-link :to="'/' + route.name" v-for="(route, index) in Routes" :key="index">
          <div class="w-100 p-relative p-16 d-flex justify-center content-center text-center tooltip-wrapper" :class="[theme.primary_color]">
            <i class="font-xl m-auto toggle cursor-pointer" :class="route.icon" />
            <span class="tooltip font-xs right offset-l-16 tangible m-y-auto p-5 z-index-11" :class="[theme.radius, theme.secondary_background]" v-html="route.name" />
          </div>
        </router-link>
      </div>
      <div class="sidebar-section">
        <div class="w-100 p-relative p-16 d-flex justify-center content-center text-center tooltip-wrapper" :class="[theme.primary_color]">
          <i class="font-xl m-auto toggle cursor-pointer uil uil-signout" />
          <span class="tooltip font-xs right offset-l-16 tangible m-y-auto p-5 z-index-11" :class="[theme.radius, theme.secondary_background]" v-html="'Signout'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Utils_Routes from "../utils/routesForNavigation";
export default {
  data() {
    return {
      Routes: Utils_Routes
    };
  }
};
</script>
