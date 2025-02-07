<template>
    <ScrollArea>
        <div class="container container-xl ">
            <Serach></Serach>
            <MonthTable></MonthTable>
        </div>
    </ScrollArea>
</template>


<script setup lang="ts">

import Serach from './serach.vue';
import MonthTable from './monthTable.vue';
const currentEmoji = ref('');

// 处理子组件传递的 Emoji
const handleEmojiSelect = (emoji: any) => {
    // 只允许输入一个 Emoji
    currentEmoji.value = emoji;
};


</script>