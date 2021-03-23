/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import store from "./vuex";
import "./theme";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
