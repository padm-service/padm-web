<template>
    <div class="p-4 border  rounded-md flex gap-2 hover:border-blue-500  cursor-text relative mb-4">
        <div>
            <h3>
                <div class="text-xl font-extrabold ">
                    vejg0lz9oi3wchmu7ocf
                </div>
            </h3>
            <p class="pt-2">更新 2024/8/8 16:27:34</p>
            <div class="flex gap-2 pt-4">
                <Button variant="outline" class="">
                    <Icon name="wpf:statistics" class="w-5 h-5" />
                    统计
                </Button>
                <Button variant="outline" class="">
                    <Icon name="material-symbols:pause-outline" class="w-5 h-5" />
                    暂停
                </Button>
                <Button variant="outline" class="">
                    <Icon name="iconamoon:player-start-duotone" class="w-5 h-5" />
                    启动
                </Button>
            </div>
            <div
                class="p-1 absolute top-0 right-0 dark:bg-[#19312B] bg-[#E5FDF7]  rounded-tr-md rounded-bl-md text-[#30ddb2] ">
                运行中
            </div>
            <div
                class="p-1 absolute bottom-0 right-0 dark:bg-[#2c1515] bg-[#ffe8e8] rounded-tr-md rounded-bl-md text-[#ca3131] ">
                已暂停
            </div>
        </div>
    </div>
</template>
<script setup lang="ts"></script>
