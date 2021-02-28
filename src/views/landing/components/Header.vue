<template>
  <div class="p-relative d-flex justify-center vh:h-800" :class="theme.background.primary">
    <div class="image-wrapper image-background h-100 image-overlay-6">
      <img src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6" alt="cover" />
    </div>
    <Navbar />
    <div class="container p-relative m-y-auto" :class="[theme.color.primary]">
      <h3 :class="[theme.font.subtitle]">EMBELLECE TUS ESPACIOS</h3>
      <h1 :class="[theme.font.title]">Diseñamos y creamos tus ideas contigo<br />para hacerlas realidad</h1>
      <router-link to="/" :class="[theme.font.button, theme.background.accent, theme.color.primary]"> Materializa tus ideas </router-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Navbar: () => import("./Navbar.vue")
  }
};
</script>
