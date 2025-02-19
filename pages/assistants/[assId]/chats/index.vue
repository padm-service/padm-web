<template>
    <ScrollArea class="flex flex-1">
        <div class="container container-lg pb-4 overflow-hidden">
            <ContainerHeader title="与 数字农艺专家 - 小橘 的历史对话"></ContainerHeader>
            <div class="flex justify-end ">
                <NuxtLink :to="`/assistants/${route.params.assId}/chats/new`">
                    <Button class="dark:bg-blue-600 bg-blue-500 text-white dark:hover:bg-blue-500  hover:bg-blue-600">
                        + 新建
                    </Button>
                </NuxtLink>
            </div>
            <ContainerChatsCard></ContainerChatsCard>
        </div>
    </ScrollArea>
</template>
<script setup lang="ts">
import { chatStore } from '~/stores/chats';

definePageMeta({
    layout: 'router'
})
const { getChats } = useChats();
const route = useRoute();
const { chatList } = storeToRefs(chatStore());
onMounted(async () => {
    chatList.value = await getChats(route.params.assId as string);
})
</script>