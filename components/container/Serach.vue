<template>
    <div class="pt-8 hidden 2xl:flex flex-col gap-4 p-6 2xl:pr-10 h-full w-80 2xl:w-96 overflow-y-auto sb-none">
        <Input type="text" placeholder="请输入关键词" class="dark:bg-[#313131] bg-[#e8e8e8]" v-model:model-value="keyword" />
        <div class="pt-2" v-for="[key, values] in Object.entries(tags)" :key="key">
            <span class="dark:text-gray-400  text-gray-500 pl-2">{{ key }}</span>
            <div class="flex flex-wrap gap-2 pt-2">

                <Button v-for="value in values" @click="select(`${key}/${value}`)" variant="ghost"
                    class=" border py-1 px-2 rounded-md cursor-pointer"
                    :class="{ 'border border-blue-500': state(`${key}/${value}`) }">
                    {{ value }}

                </Button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Service } from '~/lib/type';

const { serviceList } = storeToRefs(serviceStore());
const selectTags = ref<string[]>([]);
const tags = ref<Record<string, string[]>>({});
const services = ref<Service[]>([]);
const keyword = ref<string>('');
onMounted(async () => {
    services.value = serviceList.value;
    tags.value = groupTags(getTags(serviceList.value) as string[]);
})
watch(keyword, () => {
    serviceList.value = getServicesByTitle(services.value, keyword.value);
    serviceList.value = getServicesByTags(serviceList.value, selectTags.value);
});
function state(tags: string) {
    return computed(() => selectTags.value.includes(tags)).value;
}
function select(tags: string) {
    if (selectTags.value.includes(tags))
        selectTags.value = selectTags.value.filter(tag => tag !== tags);
    else
        selectTags.value.push(tags);
    serviceList.value = getServicesByTags(services.value, selectTags.value);
    serviceList.value = getServicesByTitle(serviceList.value, keyword.value);
}
</script>