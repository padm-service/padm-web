<template>
    <div class="px-4 sm:px-8  flex flex-1 flex-col">
        <div class="container container-xl">
            <div>
                <ContainerHeader title="数字专家"></ContainerHeader>
                <div class="flex pt-4 gap-4">
                    <Button class="bg-blue-500 text-white hover:bg-blue-700 ">
                        + 新建
                    </Button>
                    <Input type="text" placeholder="关键词搜索" class="dark:bg-[#313131] bg-[#e8e8e8] max-w-72" />
                </div>
            </div>
            <ContainerAssistantCard></ContainerAssistantCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'router'
})
</script>
