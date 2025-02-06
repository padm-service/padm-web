<template>
    <div class="px-4 py-2">
        <Button
            class="w-full dark:bg-[#4D6BFE] dark:hover:bg-[#3858fa] hover:bg-[#afd1fd]  bg-[#dbeafe]  hover:text-blue-700 text-blue-700 dark:text-white "
            variant="outline">
            <Icon name="hugeicons:message-add-01" class="w-7 h-7"></Icon>
            开启新对话
        </Button>
        <div class="flex flex-col border rounded-md hover:border-blue-500 px-4 py-2 mt-4">
            <div>
                <NuxtLink to="/assistants/assId/chats/chatId"> <span class="font-bold hover:underline">未命名对话</span>
                </NuxtLink>
            </div>
            <span class="dark:text-gray-400 text-gray-500 pt-2">2025/1/16 12:23:40</span>
        </div>
    </div>
</template>
