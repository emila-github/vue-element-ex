import { Login } from "@/api/login";
const app = {
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
  actions: {
    login(content, payload) {
      return new Promise((resolve, reject) => {
        Login(payload)
          .then(response => {
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
  }
};
export default app;
