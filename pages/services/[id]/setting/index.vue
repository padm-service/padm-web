<template>
    <ScrollArea>
        <div class="container container-md">
            <div>
                <h2 class="font-bold text-xl">模型ICON</h2>
                <div class="flex justify-between items-center mt-4">
                    <div class="flex border rounded-md w-32 items-center">
                        <Input disabled v-model="icon" readonly class=" text-2xl border-none !opacity-100 " />
                        <Emoji @select-emoji="handleEmojiSelect" />
                    </div>
                    <Button variant="outline" @click="updateItem({ icon })"
                        class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white hover:text-white">保存</Button>
                </div>
            </div>
            <div>
                <h2 class="font-bold text-xl">模型概述</h2>
                <p class="dark:text-gray-400 text-gray-500 block pt-2">
                    格式参考
                    <NuxtLink class="underline" href="https://www.markdownguide.org/basic-syntax" target="_blank">
                        Markdown 基础语法
                    </NuxtLink>
                </p>
            </div>
            <div v-if="schema">
                <ContainerTextArea name="readme" :content="service?.readme ?? ''"></ContainerTextArea>
            </div>
            <div v-else>
                加载中
            </div>
            <div>
                <h2 class="font-bold text-xl">接口描述</h2>
                <p class="dark:text-gray-400 text-gray-500 pt-2">
                    格式参考
                    <NuxtLink class="underline" href="https://spec.openapis.org/oas/v3.1.1.html" target="_blank">
                        OpenAPI Specification Version 3.1.1
                    </NuxtLink>
                </p>
            </div>
            <div v-if="schema">
                <ContainerTextArea name="schema" :content="schema"></ContainerTextArea>
            </div>
            <div v-else>
                加载中
            </div>
            <h2 class="font-bold text-xl">危险操作</h2>
            <div class="border rounded-md border-red-700">
                <div class="flex items-center justify-between px-3 py-2 border-b">
                    <div class="pt-2">
                        <h3 class="font-extrabold ">访问控制</h3>
                        <p class="dark:text-gray-400 text-gray-500">设置谁能访问到该模型</p>
                    </div>
                    <Dialog>
                        <DialogTrigger as-child>
                            <Button variant="destructive">设置</Button>
                        </DialogTrigger>
                        <DialogContent class="w-5/6 sm:max-w-md flex flex-col gap-5 rounded-md pt-4">
                            <DialogHeader>
                                <DialogTitle>权限控制</DialogTitle>
                                <DialogDescription>
                                    选择谁能访问到该模型：{{ toJson(service?.schema as string)?.info?.title }}
                                </DialogDescription>
                            </DialogHeader>
                            <Button :disable="service?.level === 0" @click="updateItem({ level: 0 })" variant="outline"
                                :class="{ 'border-blue-500 border': service?.level === 0 }">仅自己</Button>
                            <Button :disable="service?.level === 1" @click="updateItem({ level: -1 })" variant="outline"
                                :class="{ 'border-blue-500 border': service?.level === -1 }">
                                所有人</Button>
                        </DialogContent>
                    </Dialog>
                </div>
                <div class="flex items-center justify-between px-3 py-2 ">
                    <div class="pt-2">
                        <h3 class="font-extrabold ">删除该模型</h3>
                        <p class="dark:text-gray-400 text-gray-500">删除后不可恢复，请慎重！</p>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger as-child>
                            <Button variant="destructive">删除</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle class="text-red-500">确定删除{{ toJson(service?.schema as
                                    string)?.info?.title }}吗?
                                </AlertDialogTitle>
                                <AlertDialogDescription class="text-red-500">
                                    此操作无法撤消！这将从服务器中删除该模型的相关数据。
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>取消</AlertDialogCancel>
                                <AlertDialogAction @click="deleteItem()">删除</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    </ScrollArea>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue-sonner';
const { getService, updateService, deleteService } = useServices();
const { service } = storeToRefs(serviceStore());
const icon = ref('');
const rounte = useRoute();
const schema = ref("");
const route = useRoute();
onMounted(async () => {
    service.value = await getService(rounte.params.id as string);
    schema.value = toFormatJson(toJson(service.value?.schema ?? ''));
    icon.value = service.value?.icon as string;

});
const handleEmojiSelect = (emoji: any) => {
    icon.value = emoji;
};
async function updateItem(object: Object) {
    await updateService(rounte.params.id as string, object);
    toast.success("保存成功");
}
async function deleteItem() {
    await deleteService(rounte.params.id as string);
    navigateTo('/services');
    toast.success("已删除");
}
</script>