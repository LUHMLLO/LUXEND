<template>
  <div :class="[theme.background.secondary]">
    <section class="p-32 w-100" :class="[theme.color.primary]">
      <div class="row">
        <div class="col-2 md:col-6 xs:col-12">
          <div class="width-150 pt-16" :class="[theme.spacing.mb]">
            <div class="image-wrapper">
              <img src="@/assets/logo-large.png" alt="" />
            </div>
          </div>
          <small class="uppercase" :class="[theme.font.medium]"> contact@luxendrd.com </small>
        </div>
        <div class="col-10 p-0">
          <div class="row">
            <div class="col-4 md:col-6 xs:col-12" v-for="(col, index) in 3" :key="index">
              <h3 class="" :class="[theme.font.subtitle]">title</h3>
              <p :class="[theme.font.medium]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, repellendus, cupiditate accusamus fuga ratione libero tempore deserunt labore quo accusantium, enim veniam aliquam
                repellat odio laboriosam corrupti tenetur illum nisi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-32 w-100 text-center content-center justify-center">
      <small :class="[theme.font.medium, theme.color.primary]"> @All Rights Reverved {{ setRealtimeYear }} </small>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    setRealtimeYear() {
      const date = new Date();
      return date.getFullYear();
    }
  }
};
</script>
