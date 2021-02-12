<template>
  <div id="dashboard" :class="[theme.primary_color]">
    <section>
      <h1 class="font-4xl mb-0 uppercase">Dashboard</h1>
      <small class="font-sm">Administra tus pedidos pendientes y demas desde tu dahsboard</small>
    </section>

    <section>
      <h6 class="mb-10" :class="[theme.highlight_color]">Proyectos pendientes por aprobar</h6>
      <div class="row">
        <div class="p-16 d-inline-flex" :class="[theme.secondary_background, theme.radius]">
          <div class="width-270 height-180 overflow-hidden" :class="[theme.radius]">
            <div class="image-wrapper h-100">
              <img src="@/assets/demo.png" alt="" />
            </div>
          </div>
          <div class="width-200 d-flex flex-column ml-16">
            <div class="d-block mt-0">
              <label class="d-inline-block text-center p-x-10 p-y-5 font-xs" :class="[theme.primary_color, theme.highlight_background, theme.radius]">status</label>
            </div>
            <h6 class="mb-0 d-block font-md">kitchen model 06</h6>
            <p class="font-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex at omnis vero repudiandae dignissimos, modi nisi. Sit modi, fugiat minus ipsum odit non. Amet adipisci, dolorem cupiditate recusandae quis molestiae.</p>
            <small class="d-block font-xs">Solicitado: 21/01/2021</small>
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
            <small class="m-auto ml-0 mt-0 d-block font-xs">Aprobado: 03/02/2021</small>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h6 class="mb-10" :class="[theme.highlight_color]">Metodos de Pago</h6>
      <div class="row offset-x-16">
        <CreditCard />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {
    CreditCard: () => import("@/components/CreditCard")
  }
};
</script>
