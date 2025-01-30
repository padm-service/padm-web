<template>
    <div class="px-4 sm:px-8  flex flex-1">
        <div class=" py-8 sm:px-8 flex-1 flex flex-col">
            <div class="pb-6">
                <div class="flex items-center">
                    <ContainerBack></ContainerBack>
                    <header class="mx-auto ">
                        <span class="font-bold pb-4"> 数字模型</span>
                    </header>
                </div>
                <div class="flex justify-end">
                    <Button class="bg-blue-500 text-white hover:bg-blue-700 ">
                        + 新建
                    </Button>
                </div>
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
