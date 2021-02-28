<template>
  <div id="bottom_navigation" class="w-100 p-fixed bottom left">
    <div class="w-100 m-x-auto overflow-hidden d-flex content-center justify-evenly depth-6" :class="[theme.background.secondary]">
      <router-link :to="'/' + route.name" class="d-inline-flex p-16" :class="[theme.color.primary]" v-for="(route, index) in NewRouteList" :key="index">
        <i class="font-lg m-auto" :class="route.meta.icon" />
      </router-link>
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
