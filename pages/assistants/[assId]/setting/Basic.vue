<template>
    <span class="font-bold text-xl pt-16">基础</span>
    <div>
        <span class="font-bold text-md">助手Icon</span>
        <ContainerEmojiSelect name="assistant" :icon="assistant?.icon ?? ''" class="mt-2"></ContainerEmojiSelect>
    </div>
    <div>
        <div>
            <span class="font-bold text-md">名称</span>
            <Input class="mt-2 dark:bg-[#272727] bg-[#e8e8e8] max-w-96" v-model:model-value="name"></Input>
        </div>
    </div>
    <div>
        <div>
            <span class="font-bold text-md">描述</span>
        </div>
        <Textarea class="mt-2 dark:bg-[#272727] bg-[#e8e8e8] max-w-2xl" v-model:model-value="description"></Textarea>
        <Button @click="update()" variant="outline"
            class="mt-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white hover:text-white">保存</Button>
    </div>

</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';

const { assistant } = storeToRefs(assistantStore());
const { updateAssistant } = useAssistants();
const route = useRoute();
const name = ref(assistant.value?.name);
const description = ref(assistant.value?.description);
async function update() {
    assistant.value = await updateAssistant(route.params.assId as string, { name, description });
    toast.success("修改成功");
}
</script>