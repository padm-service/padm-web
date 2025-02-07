<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button variant="outline" class="w-32 ">
                {{ selectedDate ? `${selectedDate.getFullYear()}年${selectedDate.getMonth() + 1}月` : '选择月份' }}
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-2">
            <div class="flex flex-col gap-2">
                <!-- 年份控制 -->
                <div class="flex justify-between items-center px-2">
                    <Button variant="ghost" @click="currentYear--">‹</Button>
                    <span class="font-medium">{{ currentYear }}</span>
                    <Button variant="ghost" @click="currentYear++">›</Button>
                </div>

                <!-- 月份网格 -->
                <div class="grid grid-cols-3 gap-1">
                    <Button v-for="month in months" :key="month" variant="ghost"
                        :disabled="isMonthDisabled(currentYear, month)" :class="[
                            'h-8 w-20 text-sm',
                            isSelected(currentYear, month) && 'bg-primary text-primary-foreground'
                        ]" @click="handleMonthClick(currentYear, month)">
                        {{ formatMonth(month) }}
                    </Button>
                </div>
            </div>
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'

const props = defineProps<{
    modelValue?: Date | null
}>()

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const currentDate = new Date()
const currentYear = ref(currentDate.getFullYear())
const selectedDate = ref(new Date());

const months = Array.from({ length: 12 }, (_, i) => i)



// 禁用未来月份
const isMonthDisabled = (year: number, month: number) => {
    const date = new Date(year, month, 1)
    return date > new Date()
}

// 处理月份点击
const handleMonthClick = (year: number, month: number) => {
    selectedDate.value = new Date(year, month, 1)
    emit('update:modelValue', selectedDate.value)
    open.value = false
}

// 判断是否选中
const isSelected = (year: number, month: number) => {
    return selectedDate.value?.getFullYear() === year &&
        selectedDate.value?.getMonth() === month
}

// 格式化月份显示
const formatMonth = (month: number) => {
    return new Date(currentYear.value, month).toLocaleString('zh-CN', { month: 'short' })
}
</script>