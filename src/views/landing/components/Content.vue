<template>
  <div class="container p-y-50" :class="[theme.primary_color]">
    <!------------------------------------------------->
    <section class="d-flex justify-between content-center">
      <i class="uil uil-moon" :class="[theme.accent_color]" />
      <div :class="[theme.highlight_color]">
        <small class="font-xs uppercase">scroll down for more</small>
        <i class="uil uil-scroll font-sm"></i>
      </div>
    </section>

    <section>
      <h1 class="font-lg mb-0">Hello World</h1>
      <small class="font-sm">@luxend official web page</small>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sit laudantium dolor atque maiores eveniet ducimus, molestias natus, sequi non nesciunt? Maiores iure praesentium debitis dolorum fugiat laudantium libero deleniti.</p>
    </section>

    <section>
      <Slider class="wide">
        <div class="slide p-relative" v-for="(image, index) in 5" :key="index">
          <div class="vw:w-300 vw:h-200" :class="[theme.radius, theme.highlight_background]" />
        </div>
      </Slider>
    </section>
    <!------------------------------------------------->
  </div>
</template>

<script>
import { Slider } from "mindesignsystem";
export default {
  components: {
    Slider: Slider
  }
};
</script>
