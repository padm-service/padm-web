
import type { OpenAPIObject } from "openapi3-ts/oas31";
export const apiDocStore = defineStore('assistant', () => {
    const docs = ref<OpenAPIObject>();
    const apiDoc = ref();
    const apiDocList = ref();
    return { apiDoc, apiDocList };
})