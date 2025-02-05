<template>
    <div class="px-4 sm:px-8  flex flex-1">
        <div class=" py-8 sm:px-8 flex-1 flex flex-col">
            <div class="pb-6">
                <ContainerHeader title="数字模型"></ContainerHeader>
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
