<template>
    <ScrollArea class="flex-1">
        <div class="container container-2xl">
            <DocHead></DocHead>
            <DocUrl></DocUrl>
            <div class="flex flex-col lg:flex-row gap-8 2xl:gap-16 items-stretch ">
                <div class="flex flex-col gap-6 grow">
                    <DocRequest></DocRequest>
                    <DocResponse></DocResponse>
                </div>
                <div class="w-full lg:w-1/2 2xl:w-2/5 self-start sticky top-8">
                    <DocCode></DocCode>
                </div>
            </div>
        </div>
    </ScrollArea>
</template>
<script setup lang="ts">
const { get } = useApi();
const { apiDoc, apiDocList } = storeToRefs(apiDocStore());
const baseUrl = useRuntimeConfig().public.apiBase;
definePageMeta({
    layout: 'router'
})
onMounted(async () => {
    apiDocList.value = await get('/doc');
    console.log(apiDocList.value.paths);

})
</script>