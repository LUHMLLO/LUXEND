import Vue from "vue";

Vue.mixin({
  data() {
    return {
      design_system: {
        spacing: {
          marginY: "m-y-16",
          paddingY: "p-y-16"
        },
        radius: "round-1"
      }
    };
  },
  computed: {
    theme() {
      return {
        spacing: {
          my: "m-y-16",
          mb: "mb-16",
          py: "p-y-16",
          p: "p-16"
        },
        radius: this.design_system.radius,
        font: {
          heading: "font-4xl uppercase",
          title: "font-2xl uppercase",
          subtitle: "font-lg",
          content: "font-base",
          medium: "font-sm",
          small: "font-xs",
          link: "font-base uppercase p-16 m-0 ",
          button: "font-base uppercase font-bold p-x-32 p-y-16 d-inline-block",
          icon: "d-inline-block m-auto"
        },
        color: {
          primary: "color-baby-powder",
          secondary: "color-graphite",
          accent: "color-green-accent-4",
          highlight: "color-white-fade-1"
        },
        background: {
          primary: "bg-dark-powder",
          secondary: "bg-grey-darken-4",
          accent: "bg-green-accent-4",
          highlight: "bg-white-fade-1"
        }
      };
    }
  }
});
