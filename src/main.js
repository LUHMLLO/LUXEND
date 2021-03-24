/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import store from "./vuex";
import axios from "axios";
import "./theme";

Vue.prototype.$axios = axios
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
