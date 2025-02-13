<template>
    <div class="flex  items-center gap-16" v-if="icon">
        <div class="flex border rounded-md w-32 items-center justify-center dark:bg-[#313131] bg-[#e8e8e8]">
            <Input disabled v-model="icon" readonly
                class=" text-2xl border-none !opacity-100 dark:bg-[#313131] bg-[#e8e8e8]" />
            <Emoji @select-emoji="handleEmojiSelect" />
        </div>
        <Button variant="outline" @click="updateItem({ icon })"
            class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white hover:text-white">保存</Button>
    </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';
const { updateService } = useServices();
const { updateAssistant } = useAssistants();
const { service } = storeToRefs(serviceStore());
const { assistant } = storeToRefs(assistantStore());
const route = useRoute();
const props = defineProps({
    name: {
        type: String,
        required: true,
    }
});
const icon = ref<string>('');
onMounted(() => {
    if (props.name === 'service')
        icon.value = service.value?.icon as string;
    else if (props.name === 'assistant')
        icon.value = assistant.value?.icon as string;
})
const handleEmojiSelect = (emoji: any) => {
    icon.value = emoji;
};

async function updateItem(object: Object) {
    if (props.name === 'service')
        service.value = await updateService(route.params.id as string, object);
    else if (props.name === 'assistant')
        assistant.value = await updateAssistant(route.params.assId as string, object);
    toast.success("保存成功");
}
</script>