import { ref } from 'vue'
import type { Assistant, Chat, Key, Message, Service, FileUpload, PreSignedURL } from '@/lib/type'
const { get, del, post, put } = useApi();
const schema = {
    openapi: "3.0.3",
    info: {
        title: "未命名模型",
        version: "0.0.1"
    },
};
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
            schema,
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
//assistant

export const useAssistants = () => {

    const createAssistant = async (object: Object) => {
        return await post('/services', object) as Service;
    };
    const getAssistants = async () => {
        return await get('/assistants') as Assistant[];
    };
    const getAssistant = async (id: string) => {
        return await get(`/assistants/${id}`) as Assistant;
    };
    const updateAssistant = async (id: string, object: Object) => {
        return await put(`/assistants/${id}`, object) as Assistant;
    };
    const deleteAssistant = async (id: string) => {
        await del(`/assistants/${id}`);
    };
    return { createAssistant, getAssistants, getAssistant, updateAssistant, deleteAssistant }
}

//chat
export const useChats = () => {
    const createChat = async (id: string, object: Object) => {
        return await post(`/assistants/${id}/chats`, object) as Chat;
    };
    const getChats = async (id: string) => {
        return await get(`/assistants/${id}/chats`) as Chat[];
    };
    const deleteChat = async (assId: string, chatId: string) => {
        await del(`/assistants/${assId}/chats/${chatId}`);
    };
    return { createChat, getChats, deleteChat }
}
//message
export const useMsgs = () => {
    const getMsgs = async (assId: string, chatId: string) => {
        return await get(`/assistants/${assId}/chats/${chatId}/message`) as Message[];
    };

    return { getMsgs }
}
//file