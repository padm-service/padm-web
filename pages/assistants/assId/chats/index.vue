<template>
    <ScrollArea class="flex flex-1">
        <div class="container container-lg pb-4 ">
            <ContainerHeader title="与 数字农艺专家 - 小橘 的历史对话"></ContainerHeader>
            <div class="flex justify-end">
                <Button class="dark:bg-blue-600 bg-blue-500 text-white dark:hover:bg-blue-500  hover:bg-blue-600">
                    <NuxtLink to="/assistants/assId/chats/new"> + 新建</NuxtLink>
                </Button>
            </div>
            <ContainerChatsCard></ContainerChatsCard>
        </div>
    </ScrollArea>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'router'
})
</script>