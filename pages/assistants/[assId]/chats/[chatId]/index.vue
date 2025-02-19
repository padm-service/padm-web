<template>
    <div class="flex-1 sm:container sm:container-lg  overflow-hidden pt-0 flex flex-col ">
        <ContainerHeader :title="`${assistant?.icon}${assistant?.name}`"></ContainerHeader>
        <div class="flex flex-1 flex-col justify-between   overflow-hidden">
            <List></List>
            <ContainerInputBox></ContainerInputBox>
        </div>
    </div>
    <div class="hidden 2xl:flex overflow-y-auto overflow-x-hidden sb sb-md 2xl:max-w-96 py-4 px-2 xl:flex flex-col">
        <History></History>
    </div>
</template>
<script setup lang="ts">
import History from './history.vue'
import List from './list.vue';
definePageMeta({
    layout: 'router'
})
const route = useRoute();
const { getChats } = useChats();
const { getAssistant } = useAssistants();
const { getMsgs } = useMsgs();
const { chatList, chat } = storeToRefs(chatStore());
const { assistant } = storeToRefs(assistantStore());
const { messageList } = storeToRefs(messageStore());
onMounted(async () => {
    chatList.value = await getChats(route.params.assId as string);
    assistant.value = await getAssistant(route.params.assId as string);
    if (messageList.value.length === 0 || messageList.value[messageList.value.length - 1].content[0]?.text !== "")
        messageList.value = await getMsgs(route.params.assId as string, route.params.chatId as string)
    chat.value = chatList.value.find(chat => chat.id === route.params.chatId);
})  
</script>