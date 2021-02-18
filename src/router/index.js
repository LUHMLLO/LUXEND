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
    component: () => import(/* webpackChunkName: "platform" */ "@/views/app/Dashboard.vue"),
    meta: {
      icon: "uil uil-create-dashboard"
    }
  },
  {
    path: "/builder",
    name: "Builder",
    component: () => import(/* webpackChunkName: "builder" */ "@/views/app/Builder.vue"),
    meta: {
      icon: "uil uil-paint-tool"
    }
  },
  {
    path: "/payments",
    name: "Payments",
    component: () => import(/* webpackChunkName: "platform" */ "@/views/app/Payments.vue"),
    meta: {
      icon: "uil uil-wallet"
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import(/* webpackChunkName: "platform" */ "@/views/app/Payments.vue"),
    meta: {
      icon: "uil uil-user-circle"
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import(/* webpackChunkName: "platform" */ "@/views/app/Payments.vue"),
    meta: {
      icon: "uil uil-setting"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
