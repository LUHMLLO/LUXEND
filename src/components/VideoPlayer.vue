<template>
  <div class="h-100 w-100 p-relative">
    <div class="video-wrapper video-background" :class="!isPlaying ? 'video-overlay-5 video-blur-5' : ''">
      <video :muted="!isPlaying" loop autoplay :src="this.src" class="w-100 h-100" />
    </div>

    <div class="p-absolute h-100 w-100 cursor-pointer d-flex flex-column content-center justify-center" @click="playVideo()" v-if="this.playable">
      <div class="container p-relative" v-if="!isPlaying">
        <h2 :class="[theme.color.accent, theme.font.title]">SOMOS LUXEND</h2>

        <p :class="[theme.font.content]">
          Nos especializamos en crear y nos regimos por los más altos estándares internacionales para la prevención y seguridad estructural, así como de cada uno de los componentes, logrando calidad,
          eficiencia y precisión para asegurar la inversión de nuestros clientes.
        </p>

        <button class="bg-transparent border mt-16 round-0" :class="[theme.font.button, theme.color.primary]">
          <i class="uil uil-play m-auto"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoPlayer",
  props: {
    src: {
      type: String,
      default: require("@/assets/headervideo.mp4")
    },
    playable: {
      type: Boolean
    }
  },
  data() {
    return {
      isPlaying: false
    };
  },
  methods: {
    playVideo() {
      this.isPlaying = !this.isPlaying;
    }
  }
};
</script>
