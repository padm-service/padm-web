<template>
    <div>
        <div v-for="file in fileUploadList" :key="file.fileId" class="flex flex-col gap-2">
            <div class="flex  items-center  justify-between mt-2">
                <div class="flex items-center gap-2 max-w-[40%] overflow-hidden whitespace-nowrap  ">
                    <Icons :type="file.name.split('.').pop()" class="w-7 h-7"></Icons>
                    <span>{{ file.name }}</span>
                </div>
                <div class="flex items-center gap-1">
                    <span>{{ fileBytes(file.size) }}</span>
                    <Icon v-if="file.progress !== 100" class=" w-5 h-5 " name="line-md:uploading-loop"></Icon>
                    <Icon v-else name="lets-icons:check-fill" class="bg-green-500 w-5 h-5 "></Icon>
                    <Button variant="ghost" @click="removeFile(file.fileId)">
                        <Icon name="fluent:delete-32-filled" class="w-5 h-5 bg-red-600 dark:bg-red-800" />
                    </Button>
                </div>
            </div>
            <Progress :model-value="file.progress" class="h-[1px]"></Progress>
        </div>
    </div>
</template>
<script setup lang="ts">
const { fileUploadList } = storeToRefs(fileStore());

const removeFile = (id: string) => {
    fileUploadList.value = fileUploadList.value.filter(item => item.fileId !== id);
}
</script>