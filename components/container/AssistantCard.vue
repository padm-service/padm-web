<template>
    <div class=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4  overflow-y-auto sb-none">
        <div class="p-4 border  rounded-md flex gap-2 hover:border-blue-500  cursor-text relative ">
            <span class="text-3xl md:text-5xl  flex">🍊</span>
            <div>
                <h3 class="text-l font-bold">
                    数字农艺专家 - 小橘
                </h3>
                <p class="pt-2 text-sm">我是柑橘种植专家，有关修枝整型、施肥灌溉、病害防治的技术问题，您都可以问我。</p>
                <div class="flex gap-2 flex-wrap pt-2 text-xl">
                    <NuxtLink to="/assistants/assId/setting">
                        <Button variant="outline">
                            <Icon name="weui:setting-outlined" class="w-5 h-5"></Icon>
                            <span>设置</span>
                        </Button>
                    </NuxtLink>
                    <NuxtLink to="/assistants/assId/chats">
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
<script setup lang="ts"></script>