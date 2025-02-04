<template>
    <Progress v-model="progress" class="h-1 mx-auto" />
    <Icon name="fa-solid:file-pdf" class="w-7 h-7 bg-[#FF5924]"></Icon>
    <Icon name="fa-solid:file-word" class="w-7 h-7 bg-[#2454FF]"></Icon>
    <Icon name="ant-design:file-ppt-filled" class="w-7 h-7 bg-[#FF5924]"></Icon>
    <Icon name="bxs:file-txt" class="w-7 h-7 bg-[#65789B]"></Icon>
    <Icon name="fa-solid:file-csv" class="w-7 h-7 bg-[#00E079]"></Icon>
    <Icon name="fa-solid:file-excel" class="w-7 h-7 bg-[#00E079]"></Icon>
    <Icon name="ant-design:file-markdown-filled" class="w-7 h-7 bg-[#13F1FF]"></Icon>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const progress = ref(13)

watchEffect((cleanupFn) => {
    const timer = setTimeout(() => progress.value = 66, 500)
    cleanupFn(() => clearTimeout(timer))
})
</script>
