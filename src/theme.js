import Vue from "vue";

Vue.mixin({
  data() {
    return {
      design_system: {
        radius: "round-1",
        spacing: {
          marginY: "m-y-16"
        }
      }
    };
  },
  computed: {
    theme() {
      return {
        radius: this.design_system.radius,
        font: {
          heading: "font-4xl uppercase",
          title: "font-2xl uppercase",
          subtitle: "font-lg",
          content: "font-base",
          link: "font-base uppercase p-16 m-0 ",
          button: "font-base uppercase font-bold p-x-32 p-y-16 d-inline-block"
        },
        color: {
          primary: "color-baby-powder",
          secondary: "color-graphite",
          accent: "color-green-accent-4",
          highlight: "color-white-fade-4"
        },
        background: {
          primary: "bg-dark-powder",
          secondary: "bg-grey-darken-4",
          accent: "bg-green-accent-4",
          highlight: "bg-white-fade-4"
        }
      };
    }
  }
});
