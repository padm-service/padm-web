<template>
    <div class="container container-xl grow overflow-hidden pt-0">
        <div class="flex flex-col justify-between grow overflow-hidden">
            <ContainerHeader title="数字农艺专家 - 小橘"></ContainerHeader>
            <ContainerInputBox></ContainerInputBox>
        </div>
    </div>
    <div class="hidden 2xl:flex overflow-y-auto sb sb-md max-w-96 py-4 px-2">
        <History></History>
    </div>
</template>
<script setup lang="ts">
import History from './history.vue'
definePageMeta({
    layout: 'router'
})
</script>