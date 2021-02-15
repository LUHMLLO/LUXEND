<template>
  <div id="bottom_navigation" class="w-100 p-fixed bottom left">
    <div class="w-100 m-x-auto overflow-hidden d-flex content-center justify-evenly depth-6" :class="[theme.secondary_background]">
      <router-link :to="'/' + route.name" class="d-inline-flex p-16" :class="[theme.primary_color]" v-for="(route, index) in Routes" :key="index">
        <i class="font-lg m-auto" :class="route.icon" />
      </router-link>
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
