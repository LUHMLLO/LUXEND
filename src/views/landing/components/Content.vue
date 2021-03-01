<template>
  <div class="container p-y-50" :class="[theme.color.primary]">
    <!------------------------------------------------->
    <section class="p-y-50 d-flex justify-between content-center">
      <a href="https://www.instagram.com/luxend.rd/" class="d-inline-flex content-center" :class="[theme.color.accent]">
        <i class="uil-instagram" :class="[theme.font.icon]" />
        <span class="m-auto" :class="[theme.font.medium]">@luxend.rd</span>
      </a>
      <i class="uil uil-moon" :class="[theme.color.accent]" />
    </section>
    <!------------------------------------------------->
    <section class="p-y-50">
      <div class="row offset-x-16">
        <div class="col-4 sm:col-12" v-for="(col, index) in misionvisionvalue" :key="index">
          <div class="p-25 h-100" :class="[theme.background.secondary]">
            <i :class="[col.icon, theme.font.icon, theme.font.title]" />
            <h3 class="uppercase" :class="[theme.font.subtitle, theme.color.accent]" v-html="col.title" />
            <p :class="[theme.font.content]" v-html="col.content" />
          </div>
        </div>
      </div>
    </section>
    <!------------------------------------------------->
    <section class="p-y-50 p-relative">
      <div class="p-relative">
        <VideoPlayer :playable="true" class="w-100 height-500 overflow-hidden" />
      </div>
    </section>
    <!------------------------------------------------->
    <section class="p-y-50">
      <h3 class="uppercase" :class="[theme.font.subtitle]">Diseña tu cocina modular con nosotros</h3>
      <Slider class="wide" style="scroll-behavior: smooth !important;">
        <div class="slide p-relative" v-for="(slide, index) in sliderShowcase" :key="index">
          <div class="width-400 height-250 overflow-hidden p-relative" :class="[theme.background.highlight]">
            <div class="image-wrapper image-background h-100">
              <img :src="slide.url" alt="" />
            </div>
            <div class="p-relative"></div>
          </div>
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
    Slider: Slider,
    VideoPlayer: () => import("@/components/VideoPlayer")
  },
  data() {
    return {
      misionvisionvalue: [
        {
          icon: "uil-meeting-board",
          title: "NUESTRA MISION",
          content:
            "Abarcar el mercado con estándares de calidad, prevención y seguridad, proporcionando un servicio con tecnología de Vanguardia que nos permite exhibir que somos una empresa fielmente comprometida con la excelencia."
        },
        {
          icon: "uil-telescope",
          title: "NUESTRA VISIÓN",
          content: "Ser reconocidos como empresa de gama alta líder en innovación y confianza en todo lo que hacemos."
        },
        {
          icon: "uil-cell",
          title: "NUESTROS VALORES",
          content: "Nos distingue el trato genuino y personalizado, la delicadeza y el buen servicio con responsabilidad."
        }
      ],
      sliderShowcase: [
        {
          url: "https://images.unsplash.com/photo-1538944570562-2c9cb7857097"
        },
        {
          url: "https://images.unsplash.com/photo-1556911220-bff31c812dba"
        },
        {
          url: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a"
        },
        {
          url: "https://images.unsplash.com/photo-1556908493-4ac5f138ab77"
        },
        {
          url: "https://images.unsplash.com/photo-1586798271449-9726e2172525"
        },
        {
          url: "https://images.unsplash.com/photo-1600684388091-627109f3cd60"
        },
        {
          url: "https://images.unsplash.com/photo-1598546720078-8659863bc47d"
        }
      ]
    };
  },
  computed: {}
};
</script>
