import axios from 'axios';
import { cloneDeep } from 'lodash-es';
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { UploadFileParams, RequestOptions, Result } from '../../types/axios';

interface CreateAxiosOptions extends AxiosRequestConfig {
    authenticationScheme?: string;
    requestOptions?: RequestOptions;
}
// 在axios实例的基础上进行封装
export class Vaxios {
    private axiosInstance: AxiosInstance;
    private readonly options: CreateAxiosOptions;

    constructor(options: any) {
        this.options = options;
        this.axiosInstance = axios.create(options)
    }

    private createAxios(config: any): void {
        this.axiosInstance = axios.create(config);
    }
    getAxios(): AxiosInstance {
        return this.axiosInstance;
    }
    /**
   * @description: Reconfigure axios
   */
    configAxios(config: any) {
        if (!this.axiosInstance) {
            return;
        }
        this.createAxios(config);


    }
    /**
     * upload
     * @param config 请求配置
     * @param params 请求参数
     */
    uploadFile(config: AxiosRequestConfig, params: UploadFileParams) {
        const formData = new window.FormData();
        const customFilename = params.name || 'file';

        if (params.filename) {
            formData.append(customFilename, params.file, params.filename);
        } else {
            formData.append(customFilename, params.file);
        }

        if (params.data) {
            Object.keys(params.data).forEach((key) => {
                const value = params.data![key];
                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        formData.append(`${key}[]`, item);
                    });
                    return;
                }

                formData.append(key, params.data![key]);
            });
        }

        return this.axiosInstance.request({
            ...config,
            method: 'POST',
            data: formData,
            timeout: 100000,
            headers: {
                'Content-type': 'multipart/form-data;charset=UTF-8',
                // @ts-ignore
                ignoreCancelToken: true,
            },
        });
    }
    // restful风格接口
    get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request({ ...config, method: 'GET' }, options);
    }

    post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request({ ...config, method: 'POST' }, options);
    }

    put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request({ ...config, method: 'PUT' }, options);
    }

    delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request({ ...config, method: 'DELETE' }, options);
    }

    request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        let conf: CreateAxiosOptions = cloneDeep(config);
        const { requestOptions } = this.options;
        const opt: RequestOptions = Object.assign({}, requestOptions, options);
        conf.requestOptions = opt;

        return new Promise((resolve, reject) => {
            this.axiosInstance.request(conf).then((res: AxiosResponse<Result>) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
        })
    }
}