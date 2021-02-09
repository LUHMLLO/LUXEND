<template>
  <div class="navbar">
    <div class="navbar-content container">
      <div class="navbar-section">
        <div class="image-wrapper vw:w-100 overflow-hidden">
          <img src="https://luxend.netlify.app/img/luxend-logo.483681d8.png" alt="" />
        </div>
      </div>
      <div class="navbar-section justify-end">
        <router-link to="" :class="[theme.links, theme.primary_color]"> Home </router-link>
        <router-link to="" :class="[theme.links, theme.primary_color]"> Blog </router-link>
        <router-link to="" :class="[theme.links, theme.primary_color]"> Contact </router-link>
      </div>
      <div class="navbar-section">
        <router-link to="">
          <button :class="[theme.secondary_button, theme.primary_color]">Login</button>
        </router-link>
        <router-link to="">
          <button :class="[theme.primary_button, theme.accent_background, theme.primary_color]">Register</button>
        </router-link>
        <router-link to="">
          <button :class="[theme.primary_button, theme.accent_background, theme.primary_color]">Dashboard</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
