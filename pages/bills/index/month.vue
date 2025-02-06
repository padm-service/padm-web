<template>
    <div class="container container-xl">
        <MonthCalendar></MonthCalendar>
        <MonthTable></MonthTable>
    </div>
</template>

<script setup lang="ts">

import MonthCalendar from './monthCalendar.vue'
import MonthTable from './monthTable.vue';
const currentEmoji = ref('');

// 处理子组件传递的 Emoji
const handleEmojiSelect = (emoji: any) => {
    // 只允许输入一个 Emoji
    currentEmoji.value = emoji;
};


</script>