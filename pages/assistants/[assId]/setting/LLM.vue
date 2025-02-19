<template>
    <div v-if="llm" class="contents">
        <span class="font-bold text-xl">语言模型</span>
        <div>
            <div>
                <span class="font-bold text-md">模型</span>
            </div>
            <Input v-model:model-value="model" class="mt-2 dark:bg-[#272727] bg-[#e8e8e8] max-w-96"></Input>
        </div>
        <div>
            <div>
                <span class="font-bold text-md">系统提示词</span>
            </div>
            <Textarea v-model:model-value="systemPrompt"
                class="mt-2 dark:bg-[#272727] bg-[#e8e8e8] max-w-2xl"></Textarea>
            <div class="pt-4">
                <span class="font-bold text-md">温度系数</span>
                <div class="flex py-4  items-center gap-4 ">
                    <Slider v-model="temperature" :max="1" :step="0.01" class="mt-2 max-w-72" />
                    {{ temperature[0] }}
                </div>
                <span class="font-bold text-md">核采样率</span>
                <div class="flex py-4  items-center gap-4 ">
                    <Slider v-model="top_p" :max="1" :step="0.01" class="mt-2 max-w-72" />
                    {{ top_p[0] }}
                </div>
            </div>
            <Button @click="update()" variant="outline"
                class="mt-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white hover:text-white">保存</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Slider from '@/components/ui/slider/Slider.vue'
import { ref } from 'vue'
import { toast } from 'vue-sonner';
import type { LLM } from '~/lib/type';
const { assistant } = storeToRefs(assistantStore());
const { updateAssistant } = useAssistants();
const route = useRoute();
const model = computed({
    get: () => llm.value?.model,
    set: (value: string) => {
        (llm.value as LLM).model = value ?? "";
    },
});
const systemPrompt = computed({
    get: () => llm.value?.systemPrompt,
    set: (value: string) => {
        (llm.value as LLM).systemPrompt = value ?? "";
    },
});
const temperature = computed({
    get: () => [(llm.value as LLM).temperature],
    set: (value: number[]) => {
        (llm.value as LLM).temperature = value[0] ?? 0;
    },
});
const top_p = computed({
    get: () => [(llm.value as LLM).top_p],
    set: (value: number[]) => {
        (llm.value as LLM).top_p = value[0] ?? 0;
    },
});
const llm = ref<LLM>()
onMounted(() => {
    llm.value = assistant.value?.llm;
})
async function update() {
    assistant.value = await updateAssistant(route.params.assId as string, { llm: llm?.value });
    toast.success("修改成功");
}
</script>