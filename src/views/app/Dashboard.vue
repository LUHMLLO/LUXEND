<template>
  <div id="dashboard" :class="[theme.color.primary]">
    <section>
      <h1 class="font-4xl mb-0 uppercase">Dashboard</h1>
      <small class="font-sm">Administra tus pedidos pendientes y demas desde tu dahsboard</small>
    </section>

    <section>
      <h6 class="mb-10" :class="[theme.color.highlight]">Proyectos pendientes por aprobar</h6>
      <div class="row">
        <DashboardCard class="sm:w-100" />
      </div>
    </section>

    <section>
      <h6 class="mb-10" :class="[theme.color.highlight]">Proyectos aprobados</h6>
      <div class="row">
        <DashboardCard IMGwidth="width-100" IMGheight="height-100" v-bind:CardDescription="false" class="sm:w-100" />
      </div>
    </section>

    <section>
      <h6 class="mb-10" :class="[theme.color.highlight]">Metodos de Pago</h6>
      <div class="row offset-x-16">
        <CreditCard />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {
    DashboardCard: () => import("@/components/DashboardCard"),
    CreditCard: () => import("@/components/CreditCard")
  }
};
</script>
