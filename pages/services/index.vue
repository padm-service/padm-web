<template>
    <div class="px-4 sm:px-8  flex flex-1">
        <div class=" py-8 sm:px-8 flex-1 flex flex-col">
            <div class="pb-6">
                <header class="flex justify-center">
                    <span class="font-bold pb-4"> 数字模型</span>
                </header>
                <Button class="bg-blue-500 text-white hover:bg-blue-700">
                    + 新建
                </Button>
            </div>
            <ContainerServiceCard></ContainerServiceCard>
        </div>
        <ContainerSerach></ContainerSerach>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'router'
})
</script>
