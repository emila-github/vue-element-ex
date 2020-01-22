import { Login } from "@/api/login";
import { setToken, setUsername, getUsername } from "@/utils/app";

const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  toKen: "",
  username: getUsername("username") || ""
  // count: 10
};

const getters = {
  username: state => state.username
  // count: state => state.count + 10
};
const mutations = {
  SET_COLLAPSE(state) {
    console.log("todo SET_COLLAPSE");
    state.isCollapse = !state.isCollapse;
    // html5 本地存储
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state, value) {
    state.toKen = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  }
  // SET_COUNT(state, payload) {
  //   state.count = payload;
  // }
};
const actions = {
  login(content, payload) {
    return new Promise((resolve, reject) => {
      Login(payload)
        .then(response => {
          let data = response.data.data;
          content.commit("SET_TOKEN", data.token);
          content.commit("SET_USERNAME", data.username);
          setToken(data.token);
          setUsername(data.username);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  // setMenuStatus(content, data) {
  //   console.log("setMenuStatus", content, data);
  //   content.commit("SET_COLLAPSE");
  // }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
