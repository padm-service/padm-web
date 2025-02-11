import { ref } from 'vue'
import { type Key } from '@/lib/type'
const { get, del } = useApi();
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