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
