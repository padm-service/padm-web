<template>
    <div class="container container-lg pb-4  justify-center">
        <Welcome></Welcome>
        <ContainerInputBox></ContainerInputBox>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'router'
})
import Welcome from './Welcome.vue';
</script>