import type { Colletion } from "~/lib/type";

export const colletionStore = defineStore('colletion', () => {
    const colletion = ref<Colletion>();
    const colletionList = ref<Colletion[]>([]);
    return { colletion, colletionList };
})