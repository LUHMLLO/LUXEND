<template>
  <div id="landing" :class="theme.primary_background">
      <Navbar/>
      <Header/>
  </div>
</template>

<script>
export default {
  name: "Landing",
  components: {
      Navbar: ()=> import('./components/Navbar'),
      Header: ()=> import('./components/Header'),
  },
};
</script>

//70da8f
