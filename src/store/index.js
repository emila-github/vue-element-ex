import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false
    // count: 10
  },
  getters: {
    // count: state => state.count + 10
  },
  mutations: {
    SET_COLLAPSE(state) {
      console.log("todo SET_COLLAPSE");
      state.isCollapse = !state.isCollapse;
    }
    // SET_COUNT(state, payload) {
    //   state.count = payload;
    // }
  },
  actions: {},
  modules: {}
});
