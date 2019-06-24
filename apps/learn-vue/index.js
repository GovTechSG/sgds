import Vue from "vue";
import App from "./App.vue";

new Vue({
    render: createElement => {
        return createElement(App);
    }
}).$mount("#learn-vue");