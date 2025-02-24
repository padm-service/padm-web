<template>
    <span class="font-bold text-xl ">扩展</span>
    <div class="flex flex-col ">
        <Label for="knowledge" class="font-bold text-md">知识库</Label>
        <Select v-model="knowledge">
            <SelectTrigger id="framework" class="mt-2 max-w-56 dark:bg-[#313131] bg-[#e8e8e8]">
                <SelectValue placeholder="请选择知识库" />
            </SelectTrigger>
            <SelectContent position="popper">
                <SelectItem value="none">
                    默认（无）
                </SelectItem>
                <SelectItem :value="colletion.id" v-for="colletion in colletionList" :key="colletion.id">
                    {{ colletion.name }}
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
    <div>
        <span class="font-bold text-md">模型服务</span>
        <ScrollArea class="h-56 rounded-md border max-w-96 mt-2 dark:bg-[#313131] bg-[#e8e8e8]">
            <div class="p-4 ">
                <div v-for="service in serviceList" :key="service.id">
                    <div class="flex items-center gap-4">
                        <Checkbox :id="service.id" :checked="selectSercices.includes(service.id)"
                            @update:checked="checked => handleCheck(service.id, checked)" />
                        <label :for="service.id" class="text-md hover:text-blue-600 cursor-pointer ">
                            {{ service.schema.info.title }}
                        </label>
                    </div>
                    <Separator class="my-2" />
                </div>
            </div>
        </ScrollArea>
        <Button @click="update()" variant="outline"
            class="mt-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white hover:text-white">保存</Button>
    </div>

</template>
<script setup lang="ts">
import { toast } from 'vue-sonner';
const knowledge = ref("none");
const route = useRoute();
const selectSercices = ref<String[]>([]);
const { getServices } = useServices();
const { updateAssistant } = useAssistants();
const { getColletions } = useColletions();
const { assistant } = storeToRefs(assistantStore());
const { serviceList } = storeToRefs(serviceStore());
const { colletionList } = storeToRefs(colletionStore());
onMounted(async () => {
    knowledge.value = assistant.value?.knowledge[0] ?? "none" as string;
    serviceList.value = await getServices();
    colletionList.value = await getColletions();
    selectSercices.value = assistant.value?.services as string[];
})

const handleCheck = (id: string, checked: boolean) => {
    selectSercices.value = checked
        ? [...selectSercices.value, id]
        : selectSercices.value.filter(item => item !== id)
}

const update = async () => {
    assistant.value = await updateAssistant(route.params.assId as string, { services: selectSercices, knowledge: [knowledge.value] });
    toast.success("修改成功");
} 
</script>