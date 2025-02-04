<template>
    <div class="container container-2xl">
        <div class="flex flex-col justify-between flex-1">
            <div class="flex flex-col gap-8">
                <Stepper class="flex w-full items-start gap-2">
                    <StepperItem v-for="step in steps" :key="step.step"
                        class="relative flex w-full flex-col items-center justify-center" :step="step.step">
                        <StepperSeparator v-if="step.step !== steps.length"
                            class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted"
                            :class="{ 'dark:bg-[#1358be]  bg-[#93befd]': currentStep > step.step }" />

                        <StepperTrigger as-child :disabled="true" class="!opacity-100">
                            <Button :variant="getStepState(step.step) !== 'inactive' ? 'default' : 'outline'"
                                size="icon" class="z-10 rounded-full" :class="{
                                    'dark:bg-[#1358be]  bg-[#93befd]': getStepState(step.step) === 'active',
                                    ' dark:bg-[#1358be] bg-[#93befd]': getStepState(step.step) === 'completed',
                                }">
                                <Check v-if="getStepState(step.step) === 'completed'" class="size-5" />
                                <Circle v-else-if="getStepState(step.step) === 'active'" />
                                <Dot v-else />
                            </Button>
                        </StepperTrigger>

                        <div class="mt-5 flex flex-col items-center text-center">
                            <StepperTitle :class="{
                                'text-blue-600': getStepState(step.step) === 'active',
                                'text-blue-600 border-none': getStepState(step.step) === 'completed'
                            }">
                                {{ step.title }}
                            </StepperTitle>
                        </div>
                    </StepperItem>
                </Stepper>
                <Upload></Upload>
            </div>
            <div class="flex justify-between pt-4 border-t">
                <Button variant="outline" @click="handlePrev">
                    <span v-if="currentStep === 1">取消</span>
                    <span v-else>上一步</span>
                </Button>
                <Button :disabled="currentStep === totalSteps" @click="handleNext">
                    {{ currentStep === totalSteps ? '完成' : '下一步' }}
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Upload from './upload.vue'
definePageMeta({
    layout: 'router'
})

import { ref } from 'vue'
import { Check, Circle, Dot } from 'lucide-vue-next'

const steps = [
    { step: 1, title: '上传知识' },
    { step: 2, title: '知识配置' },
    { step: 3, title: '向量化数据' }
]

const currentStep = ref(1)
const totalSteps = steps.length

// 获取步骤状态
const getStepState = (step: number) => {
    if (currentStep.value > step) return 'completed'
    if (currentStep.value === step) return 'active'
    return 'inactive'
}

const handlePrev = () => currentStep.value = Math.max(1, currentStep.value - 1)
const handleNext = () => currentStep.value = Math.min(totalSteps, currentStep.value + 1)
</script>