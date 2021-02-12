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

    <section class="pt-50 pb-10">
      <h1 class="font-xl mb-0">LUXEND</h1>
      <a href="https://www.instagram.com/luxend.rd/" target="blank" class="font-sm" :class="[theme.accent_color]">@luxend.rd</a>
      <p class="font-base">Nos encargamos de la fabricación de los productos arquitectónicos mas exclusivos para los espacios más elegantes y lujosos.</p>
      <p class="font-base">
        Con creatividad brindamos soluciones reales a los retos que nos presentan nuestros clientes, ofreciendo desde estructuras y espacios personalizados, proyectos arquitectónicos, cocinas
        modulares, mamparas, paneles modulares, exclusiva línea de productos en Bronce, productos y servicios arquitectónicos de calidad para realizar en los espacios más lujosos y elegantes.
      </p>
    </section>

    <section>
      <Slider class="wide">
        <div class="slide p-relative" v-for="(image, index) in 5" :key="index">
          <div class="vw:w-381 vw:h-200 overflow-hidden" :class="[theme.radius, theme.highlight_background]">
            <div class="image-wrapper h-100">
              <img src="@/assets/ModularKitchen.jpg" alt="" />
            </div>
          </div>
        </div>
      </Slider>
    </section>
    <!------------------------------------------------->
    <section class="p-y-50">
      <div class="row offset-x-16">
        <!------------------------------------------------->
        <div class="col-6">
          <h6 class="mt-0 mb-10" :class="[theme.highlight_color]">Mision</h6>
          <p class="font-base mb-0">
              Nos especializamos en crear y nos regimos por los más altos estándares internacionales en pa prevención y seguridad estructural, así como de cada uno de los componentes, logrando
              calidad, eficiencia y precisión para asegurar la inversión de nuestros clientes.
          </p>
        </div>
        <!------------------------------------------------->
        <div class="col-6">
          <h6 class="mt-0 mb-10" :class="[theme.highlight_color]">Mision</h6>
          <p class="font-base mb-0">
            Abarcar el mercado con estándares de calidad, prevención y seguridad, proporcionando un servicio con tecnología de Vanguardia que nos permite exhibir que somos una empresa fielmente
            comprometida con la excelencia.
          </p>
        </div>
        <!------------------------------------------------->
        <div class="col-6">
          <h6 class="mt-0 mb-10" :class="[theme.highlight_color]">Vision</h6>
          <p class="font-base mb-0">Ser reconocidos como empresa de gama alta líder en innovación y confianza en todo lo que hacemos.</p>
        </div>
        <!------------------------------------------------->
        <div class="col-6">
          <h6 class="mt-0 mb-10" :class="[theme.highlight_color]">Valores</h6>
          <p class="font-base mb-0">Nos distingue el trato genuino y personalizado, la delicadeza y el buen servicio con responsabilidad.</p>
        </div>
        <!------------------------------------------------->
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
