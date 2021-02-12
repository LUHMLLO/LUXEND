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
      <h1 class="font-lg mb-0">LUXEND</h1>
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
          <div class="vw:w-300 vw:h-200 overflow-hidden" :class="[theme.radius, theme.highlight_background]">
            <div class="image-wrapper h-100">
              <img src="@/assets/ModularKitchen.jpg" alt="" />
            </div>
          </div>
        </div>
      </Slider>
    </section>
    <!------------------------------------------------->
    <section>
      <p class="font-base">
        Nos especializamos en crear y nos regimos por los más altos estándares internacionales en pa prevención y seguridad estructural, así como de cada uno de los componentes, logrando calidad,
        eficiencia y precisión para asegurar la inversión de nuestros clientes.
      </p>
    </section>
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
