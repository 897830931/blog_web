import { defineStore } from 'pinia';
import { userInfo, userState } from './userType';
import { storage } from '@/utils/storage/index';
import { login } from '@/api/user';
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router';
// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore('user', {
    // 其他配置...
    state: (): userState => ({
        userInfo: null,
        token: '',

    }),
    getters: {
        getUseInfo(): any {
            return this.userInfo || storage.get('userInfo') || {};
        },
        getToken(): string {
            return this.token || storage.get('TOKEN') || '';
        }
    },
    actions: {
        setUserInfo(info: userInfo) {
            this.userInfo = info;
            storage.set('userInfo', info)
        },
        setToken(token: string) {
            this.token = token;
            storage.set("TOKEN", token)
        },
        /**
         * 登录功能
         * @param params account账号，password密码
         */
        async login(params: userInfo) {
            const router = useRouter();
            let { account, password } = params;
            let { data } = await login({
                account: account,
                password: password
            })
            if (data.code == 200) {
                message.success('登录成功')
                this.setToken(data.token);
                return Promise.resolve(true)
            } else {
                message.error(data?.msg);
                return Promise.reject(false)
            }

        }
    },

})