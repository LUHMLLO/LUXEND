<template>
  <div class="width-300 p-16 p-fixed bottom right z-index-11 transition" :class="[ShowOrHide ? 'opacity-100' : 'opacity-0 hidden']">
    <!------------------------------------------------->
    <div class="p-16 w-100 d-flex flex-column border" :class="[theme.secondary_background, theme.primary_color, theme.radius]">
      <!------------------------------------------------->
      <div class="d-flex">
        <div class="overflow-hidden width-25 height-25 mr-10" :class="[theme.radius]">
          <div class="image-wrapper h-100">
            <img src="@/assets/logo.png" alt="logo" />
          </div>
        </div>
        <div class="d-block mt-0">
          <label class="d-inline-block text-center p-x-10 p-y-5 font-xs" :class="[theme.primary_color, theme.highlight_background, theme.radius]" v-html="Notification.Status" />
        </div>
      </div>
      <h6 class="mt-10 d-block font-md mb-0" v-html="Notification.Title"></h6>
      <p class="font-xs mb-0" v-html="Notification.Description" />
      <button :class="[theme.primary_button, theme.accent_background, theme.primary_color]">{{ Notification.Button }}</button>
      <!------------------------------------------------->
    </div>
    <!------------------------------------------------->
  </div>
</template>

<script>
export default {
  data() {
    return {
      refreshing: false,
      registration: null,
      ShowOrHide: false,

      Notification: {
        Status: "not available",
        Title: "not available",
        Description: "not available",
        Button: "not available"
      }
    };
  },
  created() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (this.refreshing) return;
        this.refreshing = true;
        window.location.reload();
      });
    }
  },
  methods: {
    toggleNotification() {
      this.ShowOrHide = !this.ShowOrHide;
      setTimeout(() => {
        this.ShowOrHide = !this.ShowOrHide;
      }, 10000);
    },
    showRefreshUI(e) {
      this.registration = e.detail;
      this.Notification.Status = "En Progreso";
      this.Notification.Title = "¡Nueva versión disponible!";
      this.Notification.Description =
        "Se ha detectado una actualización más reciente, se cargará automáticamente la próxima vez que acceda a la plataforma o puede ejecutar la actualización de inmediato";
      this.Notification.Button = "Actualizar ahora";
      this.toggleNotification();
    },
    refreshApp() {
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    }
  }
};
</script>

<style scoped>
.transition {
  transition-duration: 0.5s;
  transition-property: all !important;
  transition-timing-function: ease-in-out;
}
</style>
