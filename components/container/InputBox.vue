<template>
    <div class="p-1  dark:bg-[#2F2F2F] bg-[#e8e8e8] rounded-3xl flex-col flex mx-4 mb-2 sm:mb-0">
        <div class="grid md:grid-cols-3 gap-2 mx-1 mt-1 grid-cols-2">
            <ContainerFileCard></ContainerFileCard>
        </div>
        <Textarea v-model="inputText"
            class="text-md max-h-[200px]   min-h-10  sm:min-h-16 focus-visible:ring-0  focus-visible:ring-offset-0 border-none outline-none dark:bg-[#2F2F2F] bg-[#e8e8e8] rounded-lg resize-none placeholder-gray-500 overflow-y-auto sb sb-sm sm:sb-md"
            placeholder="给小橘发送消息...." @keydown.enter="send"></Textarea>
        <div class="flex justify-between">
            <Toggle v-model:pressed="retrieval" variant="outline" aria-label="Toggle bold"
                class="rounded-xl border-none data-[state=on]:bg-[#DBEAFE] data-[state=on]:text-[#4D6BFE]   dark:data-[state=on]:text-[#48aaff] dark:data-[state=on]:bg-[#2a4a6d] gap-2">
                <Icon name="ic:twotone-menu-book" class="w-5 h-5 sm:w-7 sm:h-7"></Icon>
                <span class="hidden sm:flex">知识库</span>
            </Toggle>
            <div class="flex items-center gap-1">
                <ContainerFileUpload></ContainerFileUpload>
                <Button v-if="!pending" :disabled="!isSend" variant="ghost" size="icon" @click="send()">
                    <Icon name="mingcute:send-plane-fill" class="w-7 h-7"></Icon>
                </Button>
                <Button v-else variant="ghost" size="icon" @click="stop()">
                    <Icon name="material-symbols:stop" class="w-7 h-7"></Icon>
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup>
const { messageList, pending, abortCtrl } = storeToRefs(messageStore());
const { createChat } = useChats();
const { assistant } = storeToRefs(assistantStore());
const { chat } = storeToRefs(chatStore());
const { fileUploadList } = storeToRefs(fileStore());
const inputText = ref('');
const route = useRoute();
const retrieval = ref(false);
const isSend = computed(() => {
    return (!pending.value && (inputText.value.trim() !== ""))
})
onMounted(() => {

})
const send = async () => {
    var chatId = "";
    if (!messageList.value.length) {
        chat.value = await createChat(route.params.assId, {
            summary: inputText.value
        });
        chatId = chat.value.id;
        await navigateTo(`/assistants/${route.params.assId}/chats/${chat.value.id}`);
    }
    const thisRound = [{ text: inputText.value, type: "text" }];
    for (const file of fileUploadList.value) {
        thisRound.push({
            type: "file",
            file: {
                url: file.url,
                name: file.name,
                type: file.type,
                size: file.size,
            }
        })
    }
    const option = { messages: [{ role: "user", content: thisRound }], knowledge: assistant.value?.knowledge, llm: assistant.value?.llm, service: assistant.value?.services, retrieval: retrieval.value, chatId: chat.value.id };
    messageStore().sendMessage(option);
    inputText.value = "";
    fileUploadList.value = [];
}
const stop = () => {
    abortCtrl.value.abort();
}
</script>