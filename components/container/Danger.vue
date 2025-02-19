<template>
    <div class="max-w-2xl">
        <h2 class="font-bold text-xl">危险操作</h2>
        <div class="border rounded-md border-red-700 mt-4">
            <div class="flex items-center justify-between px-3 py-2 border-b">
                <div class="pt-2">
                    <h3 class="font-extrabold ">访问控制</h3>
                    <p class="dark:text-gray-400 text-gray-500">设置谁能访问到该{{ name }}</p>
                </div>
                <Dialog v-model:open="roleState">
                    <DialogTrigger as-child>
                        <Button variant="destructive">设置</Button>
                    </DialogTrigger>
                    <DialogContent class="w-5/6 sm:max-w-md flex flex-col gap-5 rounded-md pt-4">
                        <DialogHeader>
                            <DialogTitle>权限控制</DialogTitle>
                            <DialogDescription>
                                选择谁能访问到该{{ name }}：{{ prop.name === "assistant" ?
                                    assistant?.name : service?.schema?.info?.title }}
                            </DialogDescription>
                        </DialogHeader>
                        <Button :disable="performData?.level === 0" @click="updateItem({ level: 0 })" variant="outline"
                            :class="{ 'border-blue-500 border': performData?.level === 0 }">仅自己</Button>
                        <Button :disable="performData?.level === 1" @click="updateItem({ level: -1 })" variant="outline"
                            :class="{ 'border-blue-500 border': performData?.level === -1 }">
                            所有人</Button>
                    </DialogContent>
                </Dialog>
            </div>
            <div class="flex items-center justify-between px-3 py-2 ">
                <div class="pt-2">
                    <h3 class="font-extrabold ">删除该{{ name }}</h3>
                    <p class="dark:text-gray-400 text-gray-500">删除后不可恢复，请慎重！</p>
                </div>
                <AlertDialog v-model:open="deleteState">
                    <AlertDialogTrigger as-child>
                        <Button variant="destructive">删除</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle class="text-red-500">确定删除{{ prop.name === "assistant" ?
                                assistant?.name : service?.schema?.info?.title }}吗?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                此操作无法撤消！这将从服务器中删除该{{ name }}的相关数据。
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <Button variant="destructive" @click="deleteItem()">删除</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { toast } from 'vue-sonner';
const prop = defineProps({
    name: {
        type: String,
        require: true
    }
})
const { updateAssistant, deleteAssistant } = useAssistants();
const { updateService, deleteService } = useServices();
const { service } = storeToRefs(serviceStore());
const { assistant } = storeToRefs(assistantStore());
const performData = ref();
const route = useRoute();
const roleState = ref(false);
const deleteState = ref(false);
const name = ref('');
onMounted(() => {
    if (prop.name === 'service')
        performData.value = service.value;
    else
        performData.value = assistant.value;
    name.value = prop.name === "assistant" ? "助手" : "模型";
})

async function updateItem(object: Object) {
    if (prop.name === 'service') {
        service.value = await updateService(route.params.id as string, object);
        performData.value = service.value;
    }
    else {
        assistant.value = await updateAssistant(route.params.assId as string, object);
        performData.value = assistant.value;
    }
    roleState.value = false;
    toast.success("保存成功");
}
async function deleteItem() {
    if (prop.name === 'service') {
        await deleteService(route.params.id as string);
        navigateTo('/services');
    }
    else {
        await deleteAssistant(route.params.assId as string);
        navigateTo('/assistants');
    }
    deleteState.value = false;
    toast.success("已删除");
}
</script>