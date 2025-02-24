<template>
    <div class="flex items-center justify-between">
        <ContainerBack></ContainerBack>
        <header>
            <span class="font-bold pb-4">水稻知识库</span>
        </header>
        <Dialog v-model:open="openState">
            <DialogTrigger as-child>
                <Button class="bg-blue-500 text-white hover:bg-blue-700 ">+ 导入知识</Button>
            </DialogTrigger>
            <DialogContent class="w-96 sm:w-full rounded-md">
                <DialogHeader>
                    <DialogTitle>导入知识</DialogTitle>
                </DialogHeader>
                <Label for="picture" @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave"
                    @drop.prevent="handleDrop">
                    <div :class="[
                        'flex flex-col justify-center items-center rounded-xl border-dashed border cursor-pointer h-40',
                        'transition-colors duration-200',
                        'bg-[#e8e8e8] dark:bg-[#313131]',
                        dragActive ? 'bg-[#d0d0d0] dark:bg-[#404040] ' : ''
                    ]">
                        <div class="flex items-center justify-center"> <span class="font-bold">点击上传或拖拽文件到此处</span>
                            <Icon name="line-md:upload-twotone-loop" class="w-10 h-10 transition-transform"
                                :class="dragActive ? 'scale-110 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'" />
                        </div>
                        <span
                            class="dark:text-gray-400 text-gray-500 text-xs mt-3">目前支持上传pdf、docx、doc、txt、md、xlsx、xls、csv文件类型</span>
                    </div>
                </Label>
                <Input id="picture" type="file" class="hidden" :accept=acceptType multiple @change="handleFileSelect" />
                <ContainerFileList></ContainerFileList>
                <div class="flex mt-4 justify-end gap-2">
                    <Button variant="outline">
                        <DialogClose aria-label="Close">
                            取消
                        </DialogClose>
                    </Button>
                    <Button type="submit" :disabled="pending" @click="send">
                        <div v-if="!pending">导入</div>
                        <div v-else class="flex gap-2 items-center">
                            <Pending></Pending>
                            正在导入
                        </div>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';
const openState = ref(false);
const dragActive = ref(false);
const route = useRoute();
const pending = ref(false);
const acceptType = ".pdf,.doc,.docx,.ppt,.pptx,.txt,.csv,.xlsx,.xls,.md";
const store = fileStore();
const { fileUploadList } = storeToRefs(store);
const { createPartition, getPartitions } = usePartitions();
const { partitionList } = storeToRefs(partitionStore());
const send = async () => {
    const partitionfile: any = [];
    for (const file of fileUploadList.value) {
        partitionfile.push({
            name: file.name,
            url: file.url,
            size: file.size,
            state: "pending",
            fileId: file.fileId
        })
    }
    await createPartition(route.params.id as string, partitionfile);
    fileUploadList.value = [];
    openState.value = false;
    partitionList.value = await getPartitions(route.params.id as string);
    toast.success("导入成功，等待向量化");

};
const handleFileSelect = async (e: Event) => {
    const inputElement = e.target as HTMLInputElement;
    const files = inputElement.files;
    if (!files) {
        openState.value = false;
        toast.warning("未选择文件！");
        return;
    }
    const allowedExtensions = acceptType.split(',');
    const filesArray = Array.from(files);
    for (const file of filesArray) {
        const fileExtension = `.${file.name.split('.').pop() || ''}`.toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            openState.value = false;
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
        openState.value = false;
        toast.error("上传失败！");
    }
}

// 拖拽处理
const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    dragActive.value = true
}

const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    dragActive.value = false
}

const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    dragActive.value = false
    const files = e.dataTransfer?.files
    if (files?.[0]) {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(files[0])
        const input = document.getElementById('picture') as HTMLInputElement
        input.files = dataTransfer.files
        input.dispatchEvent(new Event('change'))
    }
}</script>