import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.mixin({ 
  data() {
    return {
      theme: {
        primary_color: "color-baby-powder",
        primary_background: "bg-grey-darken-4",
        secondary_color: "color-graphite",
        radius: "round-2",
        accent_color: 'color-green-accent-3 color-green-accent-4:hover',
        accent_background: 'bg-green-accent-3 bg-green-accent-4:hover',
        highlight_color: 'color-white-fade-5',
        highlight_background: 'bg-white-fade-5',
        primary_button: 'p-x-10 p-y-10 border-none uppercase font-xs font-medium m-y-15 cursor-pointer text-center',
        secondary_button: 'p-x-10 p-y-10 border-none outline uppercase font-xs font-medium m-y-15 cursor-pointer text-center bg-transparent',
        blockquote: 'border-l border-white-fade-5 m-0 pl-15 font-sm m-y-15',
        links: 'p-x-5 font-xs uppercase font-medium justify-center align-center text-center cursor-pointer'
      },
    };
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
