<template>
  <div class="p-relative d-flex content-center justify-center" :class="theme.primary_background">
    <VideoPlayer :playable="true" class="w-100 vh:h-950 overflow-hidden" />
    <router-link
      to="/builder"
      class="z-index-10 d-inline-block p-absolute bottom m-x-auto flex-grow-1 offset-b-15 depth-2-green-accent-3"
      :class="[theme.primary_button, theme.radius, theme.accent_background, theme.primary_color]"
    >
      materializa tus ideas
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    landingHeaderTitle: {
      type: String,
      default: "Conviértete en tu propio arquitect@"
    },
    blockquoteHeader: {
      type: String,
      default:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  },
  components: {
    VideoPlayer: () => import("@/components/VideoPlayer")
  }
};
</script>
