<template>
    <div class="relative inline-flex" :style="{
        width: `${size}px`,
        height: `${size}px`
    }" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
        <svg class="transform -rotate-90" :width="size" :height="size">
            <!-- 背景圆 -->
            <circle class="text-gray-200" :stroke-width="strokeWidth" :r="radius" :cx="size / 2" :cy="size / 2"
                fill="transparent" stroke="currentColor" />

            <!-- 进度圆 -->
            <circle :stroke="color" :stroke-width="strokeWidth" :r="radius" :cx="size / 2" :cy="size / 2"
                fill="transparent" :stroke-dasharray="circumference" :stroke-dashoffset="offset"
                stroke-linecap="round" />
        </svg>

        <!-- 百分比文字 -->
        <!-- <div class="absolute inset-0 flex items-center justify-center">
            <span class="font-medium text-gray-700" :style="{ fontSize: `${size * 0.25}px` }">
                {{ Math.round(progress) }}%
            </span>
        </div> -->
    </div>
</template>
<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        progress: number
        size?: number
        strokeWidth?: number
        color?: string
    }>(),
    {
        size: 100,
        strokeWidth: 8,
        color: '#3B82F6'
    }
)

const radius = computed(() => props.size / 2 - props.strokeWidth)
const circumference = computed(() => 2 * Math.PI * radius.value)
const offset = computed(() => circumference.value * (1 - props.progress / 100))
</script>

<style>
circle {
    transition: stroke-dashoffset 0.5s ease-out;
}
</style>