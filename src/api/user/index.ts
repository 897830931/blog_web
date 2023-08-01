import { defHttp } from "@/utils/http";

export async function login(params: any) {
    const res = await defHttp.post(
        { url: '/admin/user/login', data: params },

    );
    return res
}