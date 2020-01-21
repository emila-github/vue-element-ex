import router from "./index";
import { getToken } from "@/utils/app";
const whiteRouter = ["/login-v3"]; // 路由白名单 不需要验证登录的页面

// 路由守卫
router.beforeEach((to, from, next) => {
  /**
   * 1、直接进入index的时候，参数to被改变成了 "/index", 触发路由指向，就会跑beforeEach
   * 2、再一次 next 指向了 login, 再次发生路由指向， 再次跑beforeEach。 参数的to被改变成了"/login"
   * 3、白名单判断存在，则直接执行next(), 因为没有参数，所以不会再次beforeEach.
   */
  if (getToken()) {
    // TODO 路由动态添加，分配菜单，每个角色分配不同的菜单
    console.log("getToken 存在");
  } else {
    console.log("getToken 不存在");
    if (whiteRouter.includes(to.path)) {
      // 不在白名单
      next();
    } else {
      next("/login-v3");
    }
  }
  console.log("路由守卫");
  console.log("进入的页面（下一个页面）", to);
  console.log("离开之前的页面（上一个页面）", from);
  console.log(next);
  next();
});
