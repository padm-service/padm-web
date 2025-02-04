<template>
    <div class="space-y-2">
        <Label for="picture" @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave"
            @drop.prevent="handleDrop">
            <div :class="[
                'flex justify-center items-center rounded-xl border-dashed border cursor-pointer h-40',
                'transition-colors duration-200',
                'border-blue-500 dark:border-blue-900',
                'bg-[#e8e8e8] dark:bg-[#313131]',
                dragActive ? 'bg-[#d0d0d0] dark:bg-[#404040] border-blue-600 dark:border-blue-700' : ''
            ]">
                <Icon name="line-md:upload-twotone-loop" class="w-10 h-10 transition-transform"
                    :class="dragActive ? 'scale-110 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'" />
            </div>
        </Label>
        <Input id="picture" type="file" class="hidden" @change="handleFileSelect" />

        <!-- 文件提示 -->
        <div v-if="selectedFile" class="text-sm text-center text-gray-600 dark:text-gray-300">
            已选择文件: {{ selectedFile.name }}
        </div>
        <ContainerProgress></ContainerProgress>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dragActive = ref(false)
const selectedFile = ref<File | null>(null)

// 处理文件选择（点击和拖拽共用）
const handleFileSelect = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files?.[0]) {
        selectedFile.value = input.files[0]
    }
}

// 拖拽处理
const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    dragActive.value = true
}

const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    dragActive.value = false
}

const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    dragActive.value = false

    const files = e.dataTransfer?.files
    if (files?.[0]) {
        selectedFile.value = files[0]
        // 如果需要同步到input元素
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(files[0])
        const input = document.getElementById('picture') as HTMLInputElement
        input.files = dataTransfer.files
        input.dispatchEvent(new Event('change')) // 触发change事件
    }
}
</script>