<template>
    <ScrollArea>
        <div class="container container-md overflow-x-hidden" v-if="loading">
            <div>
                <h2 class="font-bold text-xl">模型ICON</h2>
                <ContainerEmojiSelect name="service" class="mt-4">
                </ContainerEmojiSelect>
            </div>
            <div>
                <h2 class="font-bold text-xl">模型概述</h2>
                <p class="dark:text-gray-400 text-gray-500 block pt-2">
                    格式参考
                    <NuxtLink class="underline" href="https://www.markdownguide.org/basic-syntax" target="_blank">
                        Markdown 基础语法
                    </NuxtLink>
                </p>
            </div>
            <div>
                <ContainerTextArea name="readme" :content="service?.readme ?? ''"></ContainerTextArea>
            </div>
            <div>
                <h2 class="font-bold text-xl">接口描述</h2>
                <p class="dark:text-gray-400 text-gray-500 pt-2">
                    格式参考
                    <NuxtLink class="underline" href="https://spec.openapis.org/oas/v3.1.1.html" target="_blank">
                        OpenAPI Specification Version 3.1.1
                    </NuxtLink>
                </p>
            </div>
            <div>
                <ContainerTextArea name="schema" :content="JSON.stringify(service?.schema, undefined, 2)">
                </ContainerTextArea>
            </div>
            <ContainerDanger name="service"></ContainerDanger>
        </div>
    </ScrollArea>
</template>
<script setup lang="ts">
const { getService } = useServices();
const { service } = storeToRefs(serviceStore());
const loading = ref(false);
const route = useRoute();
onMounted(async () => {
    service.value = await getService(route.params.id as string);
    loading.value = true;
});

</script>