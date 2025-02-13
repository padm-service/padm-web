<template>
    <Textarea class="dark:bg-[#313131] bg-[#e8e8e8] field-sizing-content rounded-md p-2"
        v-model:model-value="textContent" />
    <div class="flex pt-2 justify-end gap-2 items-center">
        <Label for="doc"
            class="px-4 py-2 border rounded-md h-9 flex items-center cursor-pointer dark:hover:bg-[#313131] hover:bg-[#e8e8e8]">
            导入文件
        </Label>
        <Input id="doc" type="file" class="hidden" accept="application/json" />
        <Button variant="outline" @click="updateText()"
            class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white hover:text-white">保存</Button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const { updateService } = useServices();
const route = useRoute();
const prop = defineProps({
    content: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
});
const textContent = ref();

onMounted(() => {
    textContent.value = prop.content;

});
async function updateText() {
    await updateService(route.params.id as string, { [prop.name]: textContent });
}

</script>

<style>
textarea {
    field-sizing: content;
}
</style>