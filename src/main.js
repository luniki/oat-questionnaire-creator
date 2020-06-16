import Vue from "vue";
import App from "./App.vue";
import Editor from "vue-editor-js";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

Vue.config.productionTip = false;
Vue.use(Editor);
Vue.use(Buefy, { defaultIconPack: "fas" });

new Vue({
  render: h => h(App)
}).$mount("#app");
