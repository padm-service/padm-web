<template>
    <ScrollArea class="flex-1 flex">
        <div class="container container-lg">
            <ContainerHeader title="数字农艺专家 - 小蓝"></ContainerHeader>
            <Basic></Basic>
            <LLM></LLM>
            <Extention></Extention>
            <Danger></Danger>
        </div>
    </ScrollArea>

</template>
<script setup>
import Basic from './Basic.vue';
import Extention from './Extention.vue'
import LLM from './LLM.vue';
import Danger from './Danger.vue';
definePageMeta({
    layout: 'router'
})
</script>