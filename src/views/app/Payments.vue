<template>
  <div id="payments" :class="[theme.primary_color]">
    <section>
      <h1 class="font-4xl mb-0 uppercase">Pagos</h1>
      <small class="font-sm">Administra tus métodos de pago aquí</small>
    </section>

    <section>
      <h6 class="mb-10" :class="[theme.highlight_color]">Metodos de Pago</h6>
      <div class="row offset-x-16">
        <CreditCard/>
        <CreditCardPlaceHolder/>
      </div>
    </section>

    <section>
      <h6 class="mb-10" :class="[theme.highlight_color]">Opciones de pago</h6>
      <div class="row offset-x-16">
        <div class="col-2">
              <button class="w-100" :class="[theme.button,theme.primary_color,theme.secondary_background,theme.radius]">
                  Tarjeta Bancaria
              </button>
        </div>
        <div class="col-2">
              <button class="w-100" :class="[theme.button,theme.primary_color,theme.secondary_background,theme.radius]">
                  Paypal
              </button>
        </div>
      </div>
    </section>

    <section>
      <h6 class="mb-10" :class="[theme.highlight_color]">Datos de la tarjeta</h6>
      <div class="row offset-x-16">
        <div class="col-6">
          <div class="input-wrapper p-16 border border-white-fade-1 font-sm" :class="[theme.radius,theme.secondary_background,theme.primary_color]">
            <input type="text" placeholder="Nombre del Titular">
          </div>
        </div>
        <div class="col-6">
          <div class="input-wrapper p-16 border border-white-fade-1 font-sm" :class="[theme.radius,theme.secondary_background,theme.primary_color]">
            <input type="text" placeholder="Numero">
          </div>
        </div>
        <div class="col-6">
          <div class="input-wrapper p-16 border border-white-fade-1 font-sm" :class="[theme.radius,theme.secondary_background,theme.primary_color]">
            <input type="text" placeholder="Fecha de caducidad">
          </div>
        </div>
        <div class="col-6">
          <div class="input-wrapper p-16 border border-white-fade-1 font-sm" :class="[theme.radius,theme.secondary_background,theme.primary_color]">
            <input type="text" placeholder="CVV">
          </div>
        </div>
      </div>
    </section>

    <section>
      <h6 class="mb-10" :class="[theme.highlight_color]">Realizar pago</h6>
      <div class="row offset-x-16">
        <div class="col-6">
              <button class="w-100" :class="[theme.button,theme.primary_color,theme.secondary_background,theme.radius]">
                  Realizar pago y recordar metodo de pago
              </button>
        </div>
        <div class="col-6">
              <button class="w-100" :class="[theme.button,theme.primary_color,theme.secondary_background,theme.radius]">
                  Realizar pago y olvidar metodo de pago
              </button>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  components: {
    CreditCard: ()=> import('@/components/CreditCard'),
    CreditCardPlaceHolder: ()=> import('@/components/CreditCard_PlaceHolder')
  }
};
</script>
