import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
    // count: 10
  },
  getters: {
    // count: state => state.count + 10
  },
  mutations: {
    SET_COLLAPSE(state) {
      console.log("todo SET_COLLAPSE");
      state.isCollapse = !state.isCollapse;
      // html5 本地存储
      sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
    }
    // SET_COUNT(state, payload) {
    //   state.count = payload;
    // }
  },
  actions: {},
  modules: {}
});
