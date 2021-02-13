<template>
  <div class="navbar" :class="[theme.secondary_background]">
    <div class="navbar-content container">
      <div class="navbar-section">
        <div class="image-wrapper vw:w-100 overflow-hidden">
          <img src="@/assets/logo-large.png" alt="" />
        </div>
      </div>
      <div class="navbar-section justify-end">
        <router-link to="" :class="[theme.links, theme.primary_color]"> Inicio </router-link>
        <router-link to="" :class="[theme.links, theme.primary_color]"> Blog </router-link>
        <router-link to="" :class="[theme.links, theme.primary_color]"> Contacto </router-link>
      </div>
      <div class="navbar-section">
        <router-link to="" :class="[theme.secondary_button, theme.primary_color]" v-if="false">Login</router-link>
        <router-link to="" :class="[theme.radius,theme.primary_button, theme.accent_background, theme.primary_color]" v-if="false">Register</router-link>
        <router-link to="/dashboard" :class="[theme.radius,theme.primary_button, theme.accent_background, theme.primary_color]" v-if="true">Dashboard</router-link>
      </div>
    </div>
  </div>
</template>
