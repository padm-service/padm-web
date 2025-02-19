<template>
    <div class="p-2 flex flex-col justify-center items-center">
        <div class="sm:text-3xl font-bold text-2xl">{{ assistant?.icon }} {{ `我是${assistant?.name}` }}</div>
        <div class="text-lg mt-4">{{ assistant?.description }}</div>
    </div>
</template>
<script setup lang="ts">
const route = useRoute();
const { assistant } = storeToRefs(assistantStore());
const { getAssistant } = useAssistants();
onMounted(async () => {
    assistant.value = await getAssistant(route.params.assId as string);
})
</script>