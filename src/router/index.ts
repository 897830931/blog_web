import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { useUserStore } from "@/store/user";

const Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/view/index.vue"),
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/view/home/index.vue"),
        },

        {
          path: "photo",
          name: "photo",
          component: () => import("@/view/photo/index.vue"),
        },
        {
          path: "life",
          name: "life",
          component: () => import("@/view/life/index.vue"),
        },
        {
          path: "category",
          name: "category",
          component: () => import("@/view/category/index.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/view/login/login.vue"),
    },
  ],
});
// let originPush = Router.push;
// let originReplace = Router.replace;
// Router.push = function (location, resolve, reject) {
//     //第一个形参：路由跳转的配置对象（query|params）
//     //第二个参数：undefined|箭头函数（成功的回调）
//     //第三个参数:undefined|箭头函数（失败的回调）
//     if (resolve && reject) {
//         //push方法传递第二个参数|第三个参数（箭头函数）
//         //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
//         originPush.call(this, location, resolve, reject);
//     } else {
//         //push方法没有产地第二个参数|第三个参数
//         originPush.call(
//             this,
//             location,
//             () => { },
//             () => { }
//         );
//     }
// };
// // 重写VueRouter.prototype身上的replace方法了
// Router.replace = function (location, resolve, reject) {
//     if (resolve && reject) {
//         originReplace.call(this, location, resolve, reject);
//     } else {
//         originReplace.call(
//             this,
//             location,
//             () => { },
//             () => { }
//         );
//     }
// };

// 路由前置守卫
Router.beforeEach(async (to, from, next) => {
  const userStore = await useUserStore();
  if (to.name !== "login" && !userStore.getToken) {
    next({ path: "login", name: "login" });
    return;
  }
  if (to.name == "login" && userStore.getToken && userStore.token) {
    next({ name: "home" });
    return;
  }
  // if (to.path === from.path) {
  //     // 处理重复导航
  //     next(false); // 阻止路由更新
  //     return
  // } else {
  //     // 继续正常的路由更新
  //     next();
  //     return
  // }
  next();
});
// 路由报错
// router.onError()

export default Router;
