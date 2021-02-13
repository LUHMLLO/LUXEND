import Vue from "vue";

Vue.mixin({
  data() {
    return {
      theme: {
        primary_color: "color-baby-powder",
        primary_background: "bg-dark-powder",
        secondary_color: "color-graphite",
        secondary_background: "bg-grey-darken-4",
        radius: "round-2",
        button: "font-sm m-0 height-50 border border-white-fade-1 cursor-pointer",
        accent_color: "color-green-accent-3 color-green-accent-4:hover",
        accent_background: "bg-green-accent-3 bg-green-accent-4:hover",
        highlight_color: "color-white-fade-4",
        highlight_background: "bg-white-fade-4",
        primary_button: "p-x-10 p-y-10 border-none uppercase font-xs sm:font-md font-medium m-y-15 cursor-pointer text-center",
        secondary_button: "p-x-10 p-y-10 border-none outline uppercase font-xs font-medium m-y-15 cursor-pointer text-center bg-transparent",
        blockquote: "border-l border-white-fade-5 m-0 pl-15 font-sm m-y-15 p-y-10",
        links: "p-x-5 font-xs sm:font-md sm:p-25 uppercase font-medium justify-center align-center text-center cursor-pointer"
      }
    };
  }
});
