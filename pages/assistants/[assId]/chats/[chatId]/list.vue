<template>
    <div class=" flex flex-col p-1 pb-4 sb sb-none overflow-y-auto overflow-x-hidden  " ref="scrollContainer">
        <ul class="gap-2 lg:gap-4 flex flex-col">
            <li v-for="(message, index) in messageList" :key="index" class="flex gap-2 w-5/6"
                :class="message.role === 'user' ? 'flex-row-reverse ml-auto' : ' justify-start'">
                <div class="text-2xl sm:text-4xl flex flex-col items-start">
                    {{ message.role === 'user' ? user?.icon : assistant?.icon }}
                </div>
                <div class="flex flex-col gap-2 " :class="message.role === 'user' ? 'items-end' : 'items-start'">
                    <div v-for="content in message.content" :key="content.type">
                        <ContainerMarkdown :content="content.text" v-if="content.type === 'text'"
                            class="border rounded-md p-2  max-w-full "
                            :class="message.role === 'user' ? 'bg-blue-200 dark:bg-blue-900' : 'bg-[#E5E7ED] dark:bg-[#292932] '">
                        </ContainerMarkdown>
                        <div v-else>
                            <div v-if="!pngType.includes(content.file.name.split('.').pop() as string)"
                                class="w-fit max-w-72 rounded-md border bg-white dark:bg-[#1E1E26] p-2 flex sm:gap-4 gap-1  items-center ">
                                <Icons :type="content.file.name.split('.').pop()" class="w-8 h-8" />
                                <div
                                    class="flex flex-col xl:text-lg sm:text-base text-xs justify-between whitespace-nowrap overflow-hidden text-ellipsis">
                                    <span>{{ content.file.name }}</span>
                                    <span>{{ content.file.name.split('.').pop()?.toLocaleUpperCase() }}</span>
                                    <span>{{ fileBytes(content.file.size) }}</span>
                                </div>
                            </div>
                            <img v-else :key="content.file.url + '-' + content.file.url" :src="content.file.url"
                                class="border rounded-md max-w-full object-contain max-h-40" />
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const { user } = storeToRefs(userAuthStore());
const { messageList } = storeToRefs(messageStore());
const { assistant } = storeToRefs(assistantStore());
const scrollContainer = ref<HTMLElement | null>(null);
const pngType = ['png', 'jpg', 'jpeg'];
const scrollToBottom = () => {
    if (scrollContainer.value) {
        scrollContainer.value.scrollTo({
            top: scrollContainer.value.scrollHeight,
            behavior: 'smooth', // 平滑滚动
        });
    }
};
watch(messageList, () => {
    nextTick(() => {
        scrollToBottom();
    });
}, { deep: true });

onMounted(() => {
    scrollToBottom();
});
</script>