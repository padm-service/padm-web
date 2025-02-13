import type { Assistant } from "~/lib/type";

export const assistantStore = defineStore('assistant', () => {
    const assistant = ref<Assistant>();
    const assistantList = ref<Assistant[]>([]);
    return { assistant, assistantList };
})