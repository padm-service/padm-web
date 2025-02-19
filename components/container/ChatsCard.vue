<template>
    <div v-for="chat in chatList" :key="chat.id"
        class=" px-4  border rounded-md hover:border-blue-500 cursor-pointer group py-4 relative">
        <div class="flex justify-between items-center">
            <div
                class="whitespace-nowrap overflow-hidden text-ellipsis 2xl:max-w-[80%] xl:max-w-[70%] lg:max-w-[50%]   max-w-[40%]">
                <NuxtLink :to="`/assistants/${route.params.assId}/chats/${chat.id}`"> <span
                        class="font-bold hover:underline block ">{{
                            chat.summary }}</span>
                </NuxtLink>
            </div>
            <span class="dark:text-gray-400 text-gray-500  group-hover:invisible absolute right-[2%] my-auto">{{
                convertDateTime(chat.updated_at) }}</span>
            <div class="invisible group-hover:visible  gap-2 pt-2  ">
                <Button variant="ghost" size="icon" @click="editChat(chat.id)">
                    <Icon name="nimbus:edit" class="w-5 h-5" />
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger as-child>
                        <Button variant="ghost" size="icon">
                            <Icon name="fluent:delete-32-filled" class="w-5 h-5 bg-red-600 dark:bg-red-800" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>永久删除会话</AlertDialogTitle>
                            <AlertDialogDescription>
                                本条会话数据将被永久删除，不可恢复及撤销。确定要删除吗？
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <AlertDialogAction @click="delChat(chat.id)"
                                class="bg-[#ca4d4d] hover:bg-[#c93636] dark:bg-[#961f1f] dark:hover:bg-[#ae3737] text-white">
                                删除
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const { getChats, deleteChat } = useChats();
const { chatList } = storeToRefs(chatStore());
const route = useRoute();
onMounted(async () => {
    chatList.value = await getChats(route.params.assId as string);
})
const editChat = (chatId: string) => {
    navigateTo(`/assistants/${route.params.assId}/chats/${chatId}`);
}
const delChat = async (chatId: string) => {
    await deleteChat(route.params.assId as string, chatId);
    chatList.value = await getChats(route.params.assId as string);
}
</script>