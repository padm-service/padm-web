import { ref } from 'vue'
import type { Assistant, Chat, Key, Message, Service, FileUpload, PreSignedURL, Colletion, Partition, User } from '@/lib/type';
const { get, del, post, put } = useApi();
const schema = {
    openapi: "3.0.3",
    info: {
        title: "未命名模型",
        version: "0.0.1"
    },
};
//user
export const useUsers = () => {

    const updateUser = async (object: Object) => {
        return await put('/user', object) as User;
    };
    const getUsers = async () => {
        return await get(`/users`) as User[];
    };
    const updateUsers = async (object: Object) => {
        return await put('/users', object) as User[];
    };
    const delUsers = async (id: string) => {
        return await del(`/users/${id}`) as User[];
    };
    return { updateUser, getUsers, updateUsers, delUsers };
}
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
//colletion
export const useColletions = () => {

    const createColletion = async (object: Object) => {
        return await post('/collections', object) as Colletion;
    };
    const getColletions = async () => {
        return await get('/collections') as Colletion[];
    };
    const getColletion = async (id: string) => {
        return await get(`/collections/${id}`) as Colletion;
    };
    const updateColletion = async (id: string, object: Object) => {
        return await put(`/collections/${id}`, object) as Colletion;
    };
    const deleteColletion = async (id: string) => {
        await del(`/collections/${id}`);
    };
    return { createColletion, getColletions, getColletion, updateColletion, deleteColletion }
}

//colletion
export const usePartitions = () => {
    const createPartition = async (id: string, object: Array<object>) => {
        return await post(`/collections/${id}/partitions`, object) as Partition;
    };
    const getPartitions = async (id: string) => {
        return await get(`/collections/${id}/partitions`) as Partition[];
    };
    const getPartition = async (collectionId: string, partitionId: string) => {
        return await get(`/collections/${collectionId}/partitions/${partitionId}`) as Partition;
    };
    const updatePartition = async (collectionId: string, partitionId: string, object: object) => {
        return await put(`/collections/${collectionId}/partitions/${partitionId}`, object) as Partition;
    };
    const deletePartition = async (collectionId: string, partitionId: string) => {
        await del(`/collections/${collectionId}/partitions/${partitionId}`);
    };
    const updateBatchPartition = async (collectionId: string, object: object) => {
        console.log(object);
        return await post(`/collections/${collectionId}/partitions/batch`, object) as Partition[];
    };
    const deleteBatchPartition = async (collectionId: string, object: object) => {
        await post(`/collections/${collectionId}/partitions/batch`, object);
    };
    return { createPartition, getPartitions, getPartition, updatePartition, deletePartition, updateBatchPartition, deleteBatchPartition }
}