<template>
    <div>
        <Label for="upload" class="flex items-center p-1 rounded-md cursor-pointer hover:bg-accent">
            <Icon name="flowbite:paper-clip-outline" class="w-7 h-7"></Icon>
        </Label>
        <Input id="upload" type="file" class="hidden" multiple :accept=acceptType @change="handleUpload" />
    </div>
</template>
<script setup lang="ts">
import { toast } from 'vue-sonner';
const store = fileStore();
const { fileUploadList } = storeToRefs(store);
const acceptType = ".pdf,.doc,.docx,.ppt,.pptx,.txt,.csv,.xlsx,.xls,.md,.jpg,.png,.jpeg";
const handleUpload = async (e: Event) => {
    const inputElement = e.target as HTMLInputElement;
    const files = inputElement.files;
    if (!files) {
        toast.warning("未选择文件！");
        return;
    }
    const allowedExtensions = acceptType.split(',');
    const filesArray = Array.from(files);
    for (const file of filesArray) {
        const fileExtension = `.${file.name.split('.').pop() || ''}`.toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            toast.warning("暂不支持该文件类型上传！");
            return;
        }
    }
    const fileItems = filesArray.map(file => ({
        fileId: Math.random().toString(36).slice(2),
        url: "",
        type: file.type,
        name: file.name,
        size: file.size,
        progress: 0,
    }));
    fileUploadList.value = [...fileUploadList.value, ...fileItems];
    try {
        await store.upload(files, {
            urlPreSign: '/files/pre-signed-url',
            urlFile: '/files',
        })
    } catch (error) {
        toast.error("上传失败！");
    }


}


</script>
