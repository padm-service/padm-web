<template>
    <div v-for="file in fileUploadList" :key="file.fileId" class="relative" v-if="fileUploadList.length > 0">
        <div class="absolute -top-1 -right-1">
            <Icon name="carbon:close-filled" class="bg-red-500 cursor-pointer" @click="removeFile(file.fileId)"></Icon>
        </div>
        <div class="rounded-md border bg-white dark:bg-[#1E1E26] p-2 flex sm:gap-4 gap-1  items-center ">
            <div v-if="Math.round(file.progress) === 100">
                <Icons :type="file.name.split('.').pop()" class="w-8 h-8" />
            </div>
            <ContainerCircularProgress v-else :progress="file.progress" :size="35" :stroke-width="2" class="white" />
            <div
                class="flex flex-col xl:text-lg sm:text-base text-xs justify-between whitespace-nowrap overflow-hidden text-ellipsis">
                <span>{{ file.name }}</span>
                <span>{{ file.name.split('.').pop()?.toLocaleUpperCase() }}</span>
                <span>{{ fileBytes(file.size) }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const pngType = ['png', 'jpg', 'jpeg'];
const { fileUploadList } = storeToRefs(fileStore());
const props = defineProps({
    name: {
        type: String,
        require: true
    }
})
const removeFile = (id: string) => {
    fileUploadList.value = fileUploadList.value.filter(item => item.fileId !== id);
}
</script>