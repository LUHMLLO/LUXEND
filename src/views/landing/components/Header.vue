<template>
  <div :class="theme.primary_background">
    <section class="pb-10" :class="[theme.secondary_background, theme.primary_color]">
      <div class="container">
        <div class="row offset-x-16">
          <div class="col-6 md:col-8 sm:col-10 xs:col-12">
            <h1 class="font-4xl sm:font-3xl xs:font-2xl uppercase" v-html="landingHeaderTitle" />
            <blockquote :class="[theme.blockquote]">
              <header class="font-sm sm:font-md mb-5 sm:mb-10" v-html="blockquoteHeader" />
              <footer class="font-xs sm:font-sm uppercase" v-html="'-Luxend'" />
            </blockquote>
            <router-link to="/builder" :class="[theme.primary_button, theme.radius, theme.accent_background, theme.primary_color]">materializa tus ideas</router-link>
          </div>
          <div class="col-6 md:col-12">
            <div class="w-100 height-400 overflow-hidden" :class="[theme.radius, theme.highlight_background]">
              <VideoPlayer :playable="true" class="z-index-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
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
