<template>
  <div class="navbar" :class="[theme.background.secondary]">
    <div class="navbar-content container">
      <div class="navbar-section">
        <div class="width-128 sm:width-150">
          <div class="image-wrapper overflow-hidden">
            <img src="@/assets/logo-large.png" alt="" />
          </div>
        </div>
      </div>
      <div class="navbar-section">
        <button class="uil uil-bars border border-solid bg-transparent" :class="[theme.radius, theme.font.button, theme.color.primary]" @pointerdown="SidebarStatus = !SidebarStatus" />
      </div>
    </div>

    <div class="p-fixed top left w-100 vh:h-1000 z-index-11 content-center items-center d-flex flex-column justify-center p-y-50" :class="[theme.background.primary]" v-if="SidebarStatus">
      <i
        class="uil uil-multiply d-inline-block width-50 bg-transparent p-absolute top right mt-20 mr-10 font-2xl"
        :class="[theme.radius, theme.color.primary]"
        @pointerdown="SidebarStatus = !SidebarStatus"
      />
      <router-link to="" :class="[theme.links, theme.color.primary]"> Inicio </router-link>
      <router-link to="" :class="[theme.links, theme.color.primary]"> Blog </router-link>
      <router-link to="" :class="[theme.links, theme.color.primary]"> Contacto </router-link>
      <router-link to="" :class="[theme.font.button, theme.color.primary]" v-if="false">Login</router-link>
      <router-link to="" :class="[theme.radius, theme.font.button, theme.background.accent, theme.color.primary]" v-if="false">Register</router-link>
      <router-link to="/dashboard" class="width-200" :class="[theme.radius, theme.font.button, theme.background.accent, theme.color.primary]" v-if="true">Dashboard</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SidebarStatus: false
    };
  }
};
</script>
