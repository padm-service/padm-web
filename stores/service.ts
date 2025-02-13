import type { Service } from "~/lib/type";

export const serviceStore = defineStore('service', () => {
    const service = ref<Service>();
    const serviceList = ref<Service[]>([]);
    return { service, serviceList };
})