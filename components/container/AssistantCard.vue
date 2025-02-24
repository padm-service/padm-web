<template>
    <div class=" grid flex-grow grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4  overflow-y-auto sb-none">
        <div v-for="assistant in assistantList" :key="assistant.id"
            class="p-4 border  rounded-md flex gap-2 hover:border-blue-500  cursor-text relative">
            <span class="text-3xl md:text-4xl  flex">{{ assistant.icon }}</span>
            <div>
                <h3 class="text-lg font-bold">
                    {{ assistant.name }}
                </h3>
                <p class="pt-2 text-sm">{{ assistant.description }}</p>
                <div class="flex gap-2 flex-wrap pt-2 text-xl">
                    <NuxtLink :to="`/assistants/${assistant.id}/setting`">
                        <Button variant="outline">
                            <Icon name="weui:setting-outlined" class="w-5 h-5"></Icon>
                            <span>设置</span>
                        </Button>
                    </NuxtLink>
                    <NuxtLink :to="`/assistants/${assistant.id}/chats`">
                        <Button variant="outline">
                            <Icon name="quill:chat" class="w-5 h-5"></Icon>
                            <span>对话</span>
                        </Button>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const { assistantList } = storeToRefs(assistantStore());
</script>