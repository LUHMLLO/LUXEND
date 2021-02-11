<template>
  <div :class="theme.primary_background">
    <section class="pb-50" :class="[theme.secondary_background, theme.primary_color]">
      <div class="container">
        <div class="row offset-x-16">
          <div class="col-6 md:col-8 sm:col-10 xs:col-12">
            <h1 class="font-4xl uppercase">Become your own architect</h1>
            <blockquote :class="[theme.blockquote]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas, doloremque impedit. Quaerat animi eos expedita rerum sit fugit atque vitae iure veritatis libero recusandae nisi. -quis modi vel inventore tempore, harum reiciendis eligendi!</blockquote>
            <button :class="[theme.primary_button, theme.radius, theme.accent_background, theme.primary_color]">Start building your own kitchen</button>
          </div>
          <div class="col-6 md:col-12">
            <div class="w-100 height-400 overflow-hidden" :class="[theme.radius, theme.highlight_background]">
              <VideoPlayer class="z-index-11" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {
    VideoPlayer: () => import("@/components/VideoPlayer")
  }
};
</script>
