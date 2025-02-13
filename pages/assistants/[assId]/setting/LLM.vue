<template>
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
        <Textarea v-model:model-value="system_prompt" class="mt-2 dark:bg-[#272727] bg-[#e8e8e8] max-w-2xl"></Textarea>
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

</template>

<script setup lang="ts">
import Slider from '@/components/ui/slider/Slider.vue'
import { ref } from 'vue'
import { toast } from 'vue-sonner';
const { assistant } = storeToRefs(assistantStore());
const { updateAssistant } = useAssistants();
const route = useRoute();
const model = ref();
const system_prompt = ref();
const temperature = ref([0]);
const top_p = ref([0]);
onMounted(() => {
    model.value = assistant.value?.model;
    system_prompt.value = assistant.value?.system_prompt;
    temperature.value = [assistant.value?.temperature] as number[];
    top_p.value = [assistant.value?.top_p] as number[];
})
async function update() {
    assistant.value = await updateAssistant(route.params.assId as string, {
        model, system_prompt,
        temperature: temperature.value[0], top_p: top_p.value[0]
    });
    toast.success("修改成功");
}
</script>