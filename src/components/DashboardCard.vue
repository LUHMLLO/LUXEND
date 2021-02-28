<template>
  <div class="p-16 d-inline-flex" :class="[theme.background.secondary, theme.radius]">
    <div class="overflow-hidden" :class="[theme.radius, IMGwidth, IMGheight]">
      <div class="image-wrapper h-100">
        <img src="@/assets/demo.png" alt="" />
      </div>
    </div>
    <div class="width-200 d-flex flex-column ml-16">
      <div class="d-block mt-0">
        <label class="d-inline-block text-center p-x-10 p-y-5 font-xs" :class="[theme.color.primary, theme.background.highlight, theme.radius]">status</label>
      </div>
      <h6 class="mt-10 d-block font-md" :class="[CardDescription ? 'mb-0' : 'mb-5']">kitchen model 06</h6>
      <p class="font-xs" v-if="CardDescription">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex at omnis vero repudiandae dignissimos, modi nisi. Sit modi, fugiat minus ipsum odit non. Amet adipisci, dolorem cupiditate
        recusandae quis molestiae.
      </p>
      <small class="d-block font-xs mb-0">Solicitado: 21/01/2021</small>
      <div>
        <div class="tooltip-wrapper p-relative d-inline-block cursor-pointer">
          <i class="uil uil-eye font-sm toggle" />
          <small class="tooltip right font-xs m-y-auto mt-5 ml-1">ver</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    IMGwidth: {
      type: String,
      default: "width-270 sm:width-200"
    },
    IMGheight: {
      type: String,
      default: "height-180"
    },
    CardDescription: {
      type: Boolean,
      default: true
    }
  }
};
</script>
