import { defineStore } from "pinia";
import { userInfo, userState } from "./userType";
import { storage } from "@/utils/storage/index";
import { login, loginOut } from "@/api/user";
import { message } from "ant-design-vue";
// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore("user", {
  // 其他配置...
  state: (): userState => ({
    userInfo: null,
    token: "",
  }),
  getters: {
    getUseInfo: (state): any => state.userInfo || storage.get("userInfo") || {},
    getToken: (state): string => state.token || storage.get("TOKEN") || "",
  },
  actions: {
    setUserInfo(info: userInfo) {
      this.userInfo = info;
      storage.set("userInfo", info);
    },
    setToken(token: string) {
      this.token = token;
      storage.set("TOKEN", token);
    },
    clear() {
      this.token = "";
      storage.clear();
    },

    /**
     * 登录功能
     * @param params account账号，password密码
     */
    async login(params: userInfo) {
      let { account, password } = params;
      let { data } = await login({
        account: account,
        password: password,
      });
      if (data.code == 200) {
        message.success({
          content: "登录成功",
          duration: 0.3,
        });

        this.setToken(data.token);
        return Promise.resolve(true);
      } else {
        message.error(data?.msg);
        return Promise.reject(false);
      }
    },
    async logOut() {
      let result = await loginOut();
      console.log(result);
      if (result.data.code == 200) {
        this.getToken;
        this.clear();

        return true;
      } else {
        return false;
      }
    },
  },
});
