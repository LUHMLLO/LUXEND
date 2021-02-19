<template>
  <div class="container p-y-50" :class="[theme.primary_color]">
    <!------------------------------------------------->
    <section class="d-flex justify-between content-center">
      <div class="d-inline-flex content-center" :class="[theme.accent_color]">
        <i class="uil uil-instagram ml-0 m-y-auto font-sm" />
        <a href="https://www.instagram.com/luxend.rd/" target="blank" class="font-sm ml-0 m-y-auto">luxend.rd</a>
      </div>
      <i class="uil uil-moon" :class="[theme.accent_color]" />
    </section>

    <section class="p-y-50 text-center">
      <h3 class="font-2xl mb-0">Embellece tus espacios</h3>
      <p class="font-base">Diseña tu cocina modular con nosotros</p>
    </section>
    <section>
      <Slider class="wide">
        <div class="slide p-relative" v-for="(image, index) in 5" :key="index">
          <div class="width-400 height-250 overflow-hidden" :class="[theme.radius, theme.highlight_background]">
            <div class="image-wrapper h-100">
              <img src="@/assets/ModularKitchen.jpg" alt="" />
            </div>
          </div>
        </div>
      </Slider>
    </section>
    <!------------------------------------------------->
    <section class="p-y-50 text-center">
      <h3 class="uppercase" :class="[theme.accent_color]">Somos LUXEND</h3>
      <p class="font-base mb-0">
        Nos especializamos en crear y nos regimos por los más altos estándares internacionales para la prevención y seguridad estructural, así como de cada uno de los componentes, logrando calidad,
        eficiencia y precisión para asegurar la inversión de nuestros clientes.
      </p>
    </section>
    <section>
      <div class="row sm:flex-row-reverse">
        <div class="col-6 sm:col-12 text-center">
          <section>
            <h4 class="uppercase" :class="[theme.accent_color]">Mision</h4>
            <p class="font-base">
              Abarcar el mercado con estándares de calidad, prevención y seguridad, proporcionando un servicio con tecnología de Vanguardia que nos permite exhibir que somos una empresa fielmente
              comprometida con la excelencia.
            </p>
          </section>
          <section>
            <h4 class="uppercase" :class="[theme.accent_color]">Visión</h4>
            <p class="font-base">Ser reconocidos como empresa de gama alta líder en innovación y confianza en todo lo que hacemos.</p>
          </section>
          <section>
            <h4 class="uppercase" :class="[theme.accent_color]">Valores</h4>
            <p class="font-base">Nos distingue el trato genuino y personalizado, la delicadeza y el buen servicio con responsabilidad.</p>
          </section>
        </div>
        <div class="col-6 sm:col-12 text-center d-inline-flex flex-column content-center justify-center">
          <div class="width-300 m-auto mb-16">
            <div class="image-wrapper">
              <img src="@/assets/logo-large.png" />
            </div>
          </div>
          <h3 class="m-auto mt-0">¡Where Luxury Ends!</h3>
        </div>
      </div>
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
