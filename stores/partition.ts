import type { Partition } from "~/lib/type";

export const partitionStore = defineStore('partition', () => {
    const partition = ref<Partition>();
    const partitionList = ref<Partition[]>([]);
    return { partition, partitionList };
})