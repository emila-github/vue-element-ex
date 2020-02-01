import { MessageBox } from "element-ui";
export default {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options) {
    Vue.prototype.confirm = params => {
      console.log("Plugin Test");
      MessageBox.confirm(params.content, params.tip || "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          params.fn && params.fn(params.id);
          MessageBox({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          MessageBox({
            type: "info",
            message: "已取消删除"
          });
        });
    };
  }
};
