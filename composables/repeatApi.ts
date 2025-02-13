import { ref } from 'vue'
import type { Key, Service } from '@/lib/type'
const { get, del, post, put } = useApi();
const schema = JSON.stringify({
    openapi: "3.0.3",
    info: {
        title: "未命名模型",
        version: "0.0.1"
    },
});
//key
export const useKeys = () => {
    const keyList = ref<Key[]>([]);
    const getKey = async () => {
        keyList.value = await get('/key') as Key[];
    };
    const delKey = async (id: string) => {
        await del(`/key/${id}`)
        await getKey()
    };

    return { keyList, getKey, delKey }
}
//service
export const useServices = () => {

    const createService = async () => {
        return await post('/services', {
            icon: '🌐',
            schema,
            readme: "",
            level: -1,
            unit_price: 0,
            tools: [],
        }) as Service;
    };
    const getServices = async () => {
        return await get('/services') as Service[];
    };
    const getService = async (id: string) => {
        return await get(`/services/${id}`) as Service;
    };
    const updateService = async (id: string, object: Object) => {
        return await put(`/services/${id}`, object) as Service;
    };
    const deleteService = async (id: string) => {
        await del(`/services/${id}`);
    };
    return { createService, getServices, getService, updateService, deleteService }
}
//node
