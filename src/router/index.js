import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import(/* webpackChunkName: "landing" */ "@/views/landing/Landing.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import(/* webpackChunkName: "platform" */ "@/views/app/Dashboard.vue")
  },
  {
    path: "/builder",
    name: "Builder",
    component: () => import(/* webpackChunkName: "builder" */ "@/views/app/Builder.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
