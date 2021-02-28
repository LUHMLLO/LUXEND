<template>
  <div class="h-100 w-100 p-relative">
    <div class="video-wrapper video-background video-overlay-3 video-blur-4">
      <video loop autoplay muted :src="this.src" v-if="!isPlaying" class="w-100 h-100" />
    </div>

    <div class="video-wrapper video-background" :class="!isPlaying ? 'video-overlay-3 video-blur-5' : ''">
      <video loop autoplay :src="this.src" v-if="isPlaying" class="w-100 h-100" />
    </div>

    <div class="p-absolute h-100 w-100 cursor-pointer" @click="playVideo()" v-if="this.playable">
      <button class="video-button-play color-white-fade-8" :class="!isPlaying ? 'bg-white-fade-3 backdrop-blur-5' : 'bg-transparent border-transparent'">
        <span class="" v-if="!isPlaying">
          <i class="uil uil-play m-auto"></i>
        </span>
      </button>
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
