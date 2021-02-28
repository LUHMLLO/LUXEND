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
        <div class="col-4" v-for="(col, index) in misionvisionvalue" :key="index">
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

    <section class="p-y-50 text-center">
      <h2 :class="[theme.font.title]">Embellece tus espacios</h2>
      <p :class="[theme.font.subtitle]">Diseña tu cocina modular con nosotros</p>
    </section>
    <section class="p-y-50">
      <Slider class="wide">
        <div class="slide p-relative" v-for="(image, index) in 5" :key="index">
          <div class="width-400 height-250 overflow-hidden" :class="[theme.radius, theme.background.highlight]">
            <div class="image-wrapper h-100">
              <img src="@/assets/ModularKitchen.jpg" alt="" />
            </div>
          </div>
        </div>
      </Slider>
    </section>
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
      ]
    };
  },
  computed: {}
};
</script>
