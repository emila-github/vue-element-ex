import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueCompositionApi from "@vue/composition-api";
// 自定义全局组件
import "./icons";
import "./router/premit";
// 自定义全局组件
import global from "@/utils/global";

Vue.use(ElementUI);
Vue.use(global);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

// runtime (运行模式)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
