<template>
    <div class="flex items-center">
        <ContainerBack></ContainerBack>
        <header class="mx-auto ">
            <span class="font-bold pb-4 text-xl"> {{ title }}</span>
        </header>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: true // 必传验证
    }
});
const { title } = toRefs(props);
</script>