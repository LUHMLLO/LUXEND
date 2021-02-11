<template>
  <div id="dashboard" class="container p-y-50" :class="[theme.primary_color]">
    <section class="d-flex justify-between content-center">
      <i class="uil uil-moon" :class="[theme.accent_color]" />
      <div class="d-flex">
        <h6 class="mr-10">Mr.Melo</h6>
        <div class="avatar">
          <div class="image-wrapper depth-1 round-12">
            <img src="@/assets/avatar.png" />
          </div>
        </div>
      </div>
    </section>
    <section>
      <h1 class="font-4xl mb-0">Hello World</h1>
      <small class="font-sm">your are looking at your dashboard right now</small>
    </section>

    <section>
      <h6 class="mb-10" :class="[theme.highlight_color]">Proyectos pendientes por aprobar</h6>
      <div class="row">
        <div class="width-300 p-16 d-inline-flex content-center" :class="[theme.secondary_background, theme.radius]">
          <div class="width-100 overflow-hidden" :class="[theme.radius]">
            <div class="image-wrapper">
              <img src="https://luxend.s3.us-east-2.amazonaws.com/kyle_jewell_qbc_E_Or_27z_M_unsplash_606befa570.jpg" alt="" />
            </div>
          </div>
          <div class="d-flex flex-column ml-16">
            <h6 class="m-auto ml-0 mb-5 d-block font-md">kitchen model 06</h6>
            <small class="m-auto ml-0 mt-0 d-block font-xs">creado: 21/01/2021</small>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h6 class="mb-10" :class="[theme.highlight_color]">Proyectos aprobados</h6>
      <div class="row">
        <div class="width-300 p-16 d-inline-flex content-center" :class="[theme.secondary_background, theme.radius]">
          <div class="width-100 overflow-hidden" :class="[theme.radius]">
            <div class="image-wrapper">
              <img src="https://luxend.s3.us-east-2.amazonaws.com/kyle_jewell_qbc_E_Or_27z_M_unsplash_606befa570.jpg" alt="" />
            </div>
          </div>
          <div class="d-flex flex-column ml-16">
            <h6 class="m-auto ml-0 mb-5 d-block font-md">kitchen model 03</h6>
            <small class="m-auto ml-0 mt-0 d-block font-xs">aprobado: 03/02/2021</small>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h6 class="mb-10" :class="[theme.highlight_color]">Metodos de Pago</h6>
      <div class="row">
        
        <div class="width-200">

          <div class="d-flex flex-column w-100 justify-center content-center p-16 height-120" :class="[theme.secondary_background, theme.radius]">
            <div class="d-flex w-100 justify-between content-center">
              <i class="uil uil-sim-card font-sm m-0"></i>
              <small class="font-md m-0">Visa</small>
            </div>
            <p class="font-base m-y-16 ">**** **** **** 1234</p>
            <div class="d-flex w-100 justify-between content-center">
              <small class="font-xs m-0">09/22</small>
              <small class="font-xs m-0">debit</small>
            </div>
          </div>

        </div>

      </div>
    </section>
  </div>
</template>
