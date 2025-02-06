<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button variant="outline" class="max-w-48">
                {{ startDate ? `${startDate.getFullYear()}年${startDate.getMonth() + 1}月` : '开始日期' }}
                -
                {{ endDate ? `${endDate.getFullYear()}年${endDate.getMonth() + 1}月` : '结束日期' }}
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-2">
            <div class="flex gap-4 sm:flex-row flex-col">
                <!-- 左侧年份面板 -->
                <div class="flex flex-col gap-2 pr-4 border-r">
                    <div class="flex justify-between items-center px-2">
                        <Button variant="ghost" @click="handleYearChange('prev')">‹</Button>
                        <span class="font-medium">{{ leftPanelYear }}</span>
                        <div class="w-9" />
                    </div>
                    <div class="grid grid-cols-3 gap-1">
                        <Button v-for="month in months" :key="month" variant="ghost"
                            :disabled="isMonthDisabled(leftPanelYear, month)" :class="[
                                'h-8 w-20 text-sm',
                                isSelected(leftPanelYear, month) && 'bg-accent !hover:bg-accent',
                                isStart(leftPanelYear, month) && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
                                isEnd(leftPanelYear, month) && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                            ]" @click="handleMonthClick(leftPanelYear, month)">
                            {{ formatMonth(leftPanelYear, month) }}
                        </Button>
                    </div>
                </div>

                <!-- 右侧年份面板 -->
                <div class="flex flex-col gap-2 pl-4">
                    <div class="flex justify-between items-center px-2">
                        <div class="w-9" />
                        <span class="font-medium">{{ rightPanelYear }}</span>
                        <Button variant="ghost" @click="handleYearChange('next')">›</Button>
                    </div>
                    <div class="grid grid-cols-3 gap-1">
                        <Button v-for="month in months" :key="month" variant="ghost"
                            :disabled="isMonthDisabled(rightPanelYear, month)" :class="[
                                'h-8 w-20 text-sm',
                                isSelected(rightPanelYear, month) && 'bg-accent',
                                isStart(rightPanelYear, month) && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
                                isEnd(rightPanelYear, month) && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                            ]" @click="handleMonthClick(rightPanelYear, month)">
                            {{ formatMonth(rightPanelYear, month) }}
                        </Button>
                    </div>
                </div>
            </div>
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{
    modelValue?: [Date, Date] | null
}>()

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth()

const leftPanelYear = ref(currentYear - 1)
const rightPanelYear = ref(currentYear)

const startDate = ref<Date>()
const endDate = ref<Date>()

const months = Array.from({ length: 12 }, (_, i) => i)
// 监听 startDate 和 endDate 的变化
watch(
    [startDate, endDate],
    ([newStartDate, newEndDate]) => {
        if (newStartDate && newEndDate) {
            if (newStartDate > newEndDate) {
                [startDate.value, endDate.value] = [newEndDate, newStartDate];
            }
        }
    },
    { immediate: true } // 立即执行一次初始值的检查
);


// 初始化默认6个月范围
onMounted(() => {
    if (!props.modelValue) {
        let startYear = currentYear
        let startMonth = currentMonth - 5
        if (startMonth < 0) {
            startYear -= 1
            startMonth += 12
        }
        const defaultStart = new Date(startYear, startMonth, 1)
        const defaultEnd = new Date(currentYear, currentMonth, 1)

        startDate.value = defaultStart
        endDate.value = defaultEnd
        emit('update:modelValue', [defaultStart, defaultEnd])
    }
})

const isMonthDisabled = (year: number, month: number) => {
    const date = new Date(year, month, 1)
    const now = new Date()

    // 禁用未来月份
    if (date > now) return true

    // 选择结束日期时检查范围限制
    if (startDate.value && !endDate.value) {
        const baseDate = startDate.value || endDate.value
        if (!baseDate) return false

        // 计算允许的最小和最大月份
        const minDate = new Date(baseDate)
        minDate.setMonth(baseDate.getMonth() - 11)
        minDate.setDate(1)

        let maxDate = new Date(baseDate)
        maxDate.setMonth(baseDate.getMonth() + 11)
        maxDate.setDate(1)

        // 确保最大日期不超过当前月
        if (maxDate > now) {
            maxDate = new Date(now.getFullYear(), now.getMonth(), 1)
        }
        return date < minDate || date > maxDate
    }

    return false
}

const handleMonthClick = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    if (!startDate.value || endDate.value) {
        if (date > new Date()) return
        startDate.value = date
        endDate.value = undefined
    } else {
        // 计算最大允许结束日期（1年范围）
        const maxEnd = new Date(
            startDate.value.getFullYear() + 1,
            startDate.value.getMonth(),
            1
        )
        const actualEnd = date > maxEnd ? maxEnd : date

        endDate.value = actualEnd
        emit('update:modelValue', [startDate.value, endDate.value])
        open.value = false
    }
}

const isSelected = (year: number, month: number) => {
    const date = new Date(year, month, 1)
    return !!startDate.value && !!endDate.value &&
        date >= startDate.value && date <= endDate.value
}

const isStart = (year: number, month: number) => {
    return startDate.value?.getTime() === new Date(year, month, 1).getTime()
}

const isEnd = (year: number, month: number) => {
    return endDate.value?.getTime() === new Date(year, month, 1).getTime()
}

const handleYearChange = (direction: 'prev' | 'next') => {
    const offset = direction === 'prev' ? -1 : 1
    leftPanelYear.value += offset
    rightPanelYear.value = leftPanelYear.value + 1
}

const formatMonth = (year: number, month: number) => {
    return new Date(year, month).toLocaleString('default', { month: 'short' })
}
</script>
