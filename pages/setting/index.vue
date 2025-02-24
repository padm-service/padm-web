<template>
    <div class="container container-xl overflow-auto sb-none">
        <ContainerHeader title="账号设置"></ContainerHeader>
        <span class="font-bold text-lg">基本信息</span>
        <Basic></Basic>
        <span class="font-bold text-lg">安全设置</span>
        <Safe></Safe>
    </div>
</template>

<script lang="ts" setup>
import Basic from './basic.vue';
import Safe from './safe.vue'
definePageMeta({
    layout: 'personal'
})
</script>
