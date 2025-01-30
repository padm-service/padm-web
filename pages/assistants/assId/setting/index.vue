<template>
    <ScrollArea class="flex-1 flex">
        <div class="container container-lg">
            <div class="flex items-center">
                <ContainerBack></ContainerBack>
                <header class="mx-auto ">
                    <span class="font-bold pb-4">数字农艺专家 - 小蓝</span>
                </header>
            </div>
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