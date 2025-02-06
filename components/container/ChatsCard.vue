<template>
    <div class="px-4 py-2 border rounded-md hover:border-blue-500">
        <div class="flex justify-between items-center">
            <div>
                <NuxtLink to="/assistants/assId/chats/chatId"> <span class="font-bold hover:underline">未命名对话</span>
                </NuxtLink>
            </div>
            <div class=" flex gap-2 pt-2">
                <Button variant="ghost" size="icon">
                    <Icon name="nimbus:edit" class="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Icon name="fluent:delete-32-filled" class="w-5 h-5 bg-red-600 dark:bg-red-800" />
                </Button>
            </div>
        </div>
        <span class="dark:text-gray-400 text-gray-500 pt-2">2025/1/16 12:23:40</span>
    </div>
</template>
