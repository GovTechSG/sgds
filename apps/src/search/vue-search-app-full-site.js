import Vue from "vue";
import SearchFullSite from "./SearchFullSite.vue";
import VueCompositionAPI from "@vue/composition-api";
Vue.use(VueCompositionAPI);

new Vue({
  el: "#search-app-full-site",
  render: (h) => h(SearchFullSite),
});
