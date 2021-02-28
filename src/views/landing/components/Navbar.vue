<template>
  <div class="navbar p-absolute top left">
    <div class="navbar-content content-start justify-start items-start">
      <div class="navbar-section">
        <div class="p-y-16 p-x-32 p-relative height-200 d-flex content-center justify-center depth-1 z-index-5" :class="[theme.background.primary, theme.color.primary]">
          <div class="width-150 text-center m-auto">
            <div class="image-wrapper">
              <img src="@/assets/logo-large.png" alt="" />
            </div>
            <h6 class="mt-16 mb-0">¡Where Luxury Ends!</h6>
          </div>
        </div>
      </div>

      <div class="navbar-section justify-center flex-grow-1 text-center bg-black-fade-6 backdrop-blur-12 self-start m-0">
        <router-link to="" :class="[theme.font.link, theme.color.primary]"> Inicio </router-link>
        <router-link to="" :class="[theme.font.link, theme.color.primary]"> Blog </router-link>
        <router-link to="" :class="[theme.font.link, theme.color.primary]"> Contacto </router-link>
      </div>
      <div class="navbar-section self-start m-0">
        <router-link to="/dashboard" :class="[theme.font.button, theme.background.accent, theme.color.primary]" v-if="true">Dashboard</router-link>
      </div>
    </div>
  </div>
</template>
