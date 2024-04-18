import { Vaxios } from "./axios";
import { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
const transform: AxiosTransform = {}
import { storage } from '@/utils/storage/index';
function is(val: unknown, type: string) {
    return toString.call(val) === `[object ${type}]`;
}
function isObject(val: any): val is Record<any, any> {
    return val !== null && is(val, 'Object');
}
function deepMerge<T = any>(src: any = {}, target: any = {}): T {
    let key: string;
    for (key in target) {
        src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
    }
    return src;
}


function createAxios(opt?: Partial<CreateAxiosOptions>) {

    return new Vaxios(
        deepMerge(
            {
                // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
                // authentication schemes，e.g: Bearer
                // authenticationScheme: 'Bearer',
                authenticationScheme: '',
                timeout: 10 * 1000,
                // 基础接口地址
                // baseURL: globSetting.apiUrl,

                headers: {
                    'Content-Type': 'application/json;charset=UTF-8 ',

                },
                // 如果是form-data格式
                // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
                // 数据处理方式 拦截器
                transform,
                // 配置项，下面的选项都可以在独立的接口请求中覆盖
                requestOptions: {
                    // 默认将prefix 添加到url
                    joinPrefix: false,
                    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
                    isReturnNativeResponse: false,
                    // 需要对返回数据进行处理
                    isTransformResponse: true,
                    // post请求的时候添加参数到url
                    joinParamsToUrl: false,
                    // 格式化提交参数时间
                    formatDate: true,
                    // 消息提示类型
                    errorMessageMode: 'message',
                    // 接口地址
                    apiUrl: 'http://127.0.0.1:7001',
                    // 接口拼接地址
                    // urlPrefix: '',
                    //  是否加入时间戳
                    joinTime: true,
                    // 忽略重复请求
                    ignoreCancelToken: true,
                    // 是否携带token
                    withToken: true,
                },
            },
            opt || {},
        ),
    );
}

export const defHttp = createAxios({
    baseURL: '/api',
    headers: {
        APPID: new Date().getTime(),
        Authorization: storage.get("TOKEN"),
    },
});