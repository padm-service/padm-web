<template>
    <div class="app">
        <Header />
        <div class="h-full flex overflow-y-hidden">
            <ApiMenu :menuItems="manage">
            </ApiMenu>
            <slot class="" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { manage } from '@/utils/menus'
import type { OpenAPIObject, } from "openapi3-ts/oas31";
const { get } = useApi();
const { apiDoc, apiDocList } = storeToRefs(apiDocStore());
onMounted(async () => {
    apiDocList.value = await get('/doc') as OpenAPIObject;
    apiDoc.value = await group(apiDocList.value);
    console.log(apiDoc.value);

})
</script>
