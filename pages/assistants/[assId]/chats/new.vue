<template>
    <div class=" container container-lg pb-4  justify-center overflow-x-hidden">
        <Welcome></Welcome>
        <ContainerInputBox v-if="assistant"></ContainerInputBox>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'router'
})
import Welcome from './Welcome.vue';
const route = useRoute();
const { assistant } = storeToRefs(assistantStore());
const { getAssistant } = useAssistants();
const { chat } = storeToRefs(chatStore());
const { messageList } = storeToRefs(messageStore());
onMounted(async () => {
    chat.value = null;
    messageList.value = [];
    assistant.value = await getAssistant(route.params.assId as string);
})
</script>