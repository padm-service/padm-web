<template>
    <span class="font-bold text-xl">语言模型</span>
    <div>
        <div>
            <span class="font-bold text-md">模型</span>
        </div>
        <Input class="mt-2 dark:bg-[#272727] bg-[#e8e8e8] max-w-96"></Input>
    </div>
    <div>
        <div>
            <span class="font-bold text-md">系统提示词</span>
        </div>
        <Textarea class="mt-2 dark:bg-[#272727] bg-[#e8e8e8] max-w-2xl"></Textarea>
        <div class="pt-4">
            <span class="font-bold text-md">温度系数</span>
            <div class="flex py-4  items-center gap-4 ">
                <Slider v-model="modelValue" :max="100" :step="1" class="mt-2 max-w-72" />
                {{ modelValue }}
            </div>
            <span class="font-bold text-md">核采样率</span>
            <div class="flex py-4  items-center gap-4 ">
                <Slider v-model="modelValue" :max="100" :step="1" class="mt-2 max-w-72" />
                {{ modelValue }}
            </div>
        </div>
        <Button variant="outline"
            class="mt-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white hover:text-white">保存</Button>
    </div>

</template>

<script setup lang="ts">
import Slider from '@/components/ui/slider/Slider.vue'
import { ref } from 'vue'
const modelValue = ref([50])
</script>