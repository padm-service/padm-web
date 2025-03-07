
import type { OpenAPIObject } from "openapi3-ts/oas31";
export const apiDocStore = defineStore('apidoc', () => {
    const apiDoc = ref();
    const apiDocList = ref<OpenAPIObject>();
    return { apiDoc, apiDocList };
})