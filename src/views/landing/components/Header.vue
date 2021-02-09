<template>
  <div class="vh:h-500" :class="theme.primary_background">
    <section class="pb-50" :class="[theme.primary_background, theme.primary_color]">
      <div class="container">
        <div class="row" :class="[theme.radius]">
          <div class="col-6 md:col-8 sm:col-10 xs:col-12">
            <h1 class="font-xl uppercase">Become your own architect</h1>
            <blockquote :class="[theme.blockquote]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas, doloremque impedit. Quaerat animi eos expedita rerum sit fugit atque vitae iure veritatis libero recusandae nisi. -quis modi vel inventore tempore, harum reiciendis eligendi!</blockquote>
            <button :class="[theme.primary_button, theme.radius, theme.accent_background, theme.primary_color]">Start building your own kitchen</button>
          </div>
          <div class="col-6 md:col-12">
            <div class="p-50 w-100 h-100" :class="[theme.radius, theme.highlight_background]" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
