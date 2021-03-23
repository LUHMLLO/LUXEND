import Vue from "vue";
Vue.mixin({
    data() {
        return {
            theme_dark: {
                color: {
                    primary: "color-baby-powder",
                    secondary: "color-grey-darken-3",
                    faded: "color-blue-darken-3",
                },
                background: {
                    primary: "bg-dark-powder",
                    secondary: "bg-graphite",
                    faded: "bg-white-fade-1"
                }
            }
        };
    },
    computed: {
        theme() {
            return this.theme_dark;
        }
    }
});
