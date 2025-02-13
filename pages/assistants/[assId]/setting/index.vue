<template>
    <ScrollArea class="flex-1 flex" v-if="loading">
        <div class="container container-lg">
            <ContainerHeader :title="`${assistant.icon} ${assistant.name}`"></ContainerHeader>
            <Basic></Basic>
            <LLM></LLM>
            <Extention></Extention>
            <ContainerDanger name="assistant"></ContainerDanger>
        </div>
    </ScrollArea>

</template>
<script setup>
import Basic from './Basic.vue';
import Extention from './Extention.vue'
import LLM from './LLM.vue';
definePageMeta({
    layout: 'router'
})
const route = useRoute();
const { assistant } = storeToRefs(assistantStore());
const { getAssistant } = useAssistants();
const loading = ref(false);
onMounted(async () => {
    assistant.value = await getAssistant(route.params.assId);
    loading.value = true;
})
</script>