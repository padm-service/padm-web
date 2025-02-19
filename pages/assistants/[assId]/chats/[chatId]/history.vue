<template>
    <div class="px-4 py-2">
        <NuxtLink :to="`/assistants/${route.params.assId}/chats/new`">
            <Button
                class="w-full dark:bg-[#4D6BFE] dark:hover:bg-[#3858fa] hover:bg-[#afd1fd]  bg-[#dbeafe]  hover:text-blue-700 text-blue-700 dark:text-white "
                variant="outline">
                <Icon name="hugeicons:message-add-01" class="w-7 h-7"></Icon>
                开启新对话
            </Button>
        </NuxtLink>
        <div v-for="chat in chatList" :key="chat.id">
            <NuxtLink :to="`/assistants/${route.params.assId}/chats/${chat.id}`">
                <div class="flex flex-col border rounded-md hover:border-blue-500 px-4 py-2 mt-4 whitespace-nowrap overflow-hidden text-ellipsis"
                    :class="{ 'bg-[#313131]': chat.id === route.params.chatId }">
                    <span class="font-bold hover:underline">
                        {{ chat.summary }}
                    </span>
                    <span class="dark:text-gray-400 text-gray-500 pt-2">{{ convertDateTime(chat.updated_at) }}</span>
                </div>
            </NuxtLink>
        </div>

    </div>
</template>
<script setup lang="ts">
const route = useRoute();
const { chatList } = storeToRefs(chatStore());
</script>