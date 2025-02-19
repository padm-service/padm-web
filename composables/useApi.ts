export const useApi = () => {
    // 创建一个通用的 API 请求封装
    const request = async (url: string, options: any = {}) => {
        const baseUrl = useRuntimeConfig().public.apiBase;
        const loginUrl = ['/iam/login', '/iam/register'].some(path => url.startsWith(path));
        const defaultOptions = {
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            ...options,
        };

        // 添加鉴权令牌（排除登录/注册接口）
        if (!loginUrl) {
            const token = useCookie('hz_token').value;
            if (token && !defaultOptions.headers.has('Authorization')) {
                defaultOptions.headers.set('Authorization', `Bearer ${token}`);
            }
        }
        const { data, status, error, refresh, clear } = await useFetch(`${baseUrl}${url}`, {
            ...defaultOptions,
            onRequest({ options }) {
                if (!loginUrl) {
                    const token = useCookie('hz_token').value;
                    options.headers = options.headers || new Headers()
                    if (!options.headers.has('Authorization')) {
                        options.headers.set('Authorization', `Bearer ${token}`)
                    }
                }
            },
            onRequestError({ error }) {
                console.error('请求错误:', error);
            },
            onResponse({ response }) {
                if (response._data?.access_token) {
                    const { access_token, expiry } = response._data;
                    const tokenCookie = useCookie('hz_token', {
                        expires: new Date(expiry),
                    })
                    tokenCookie.value = access_token;
                }
            },
            onResponseError({ request, response, options }) {
                // 响应错误时的处理
            },
        });
        if (error.value || status.value === 'error') {
            throw new Error(error.value?.statusMessage);
        }
        return data.value;
    };
    // GET 请求
    const get = (url: string, params: object = {}) => {
        return request(url, { method: 'GET', params });
    };

    // POST 请求
    const post = (url: string, body: object = {}) => {
        return request(url, { method: 'POST', body });
    };

    // PUT 请求
    const put = (url: string, body: object = {}) => {
        return request(url, { method: 'PUT', body });
    };

    // DELETE 请求
    const del = (url: string) => {
        return request(url, { method: 'DELETE' });
    };
    // 返回封装的所有请求方法
    return {
        get,
        post,
        put,
        del,
    };
};
