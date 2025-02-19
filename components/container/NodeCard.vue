<template>
    <div v-for="node in nodes" :key="node.id"
        class="p-4 border  rounded-md flex gap-2 hover:border-blue-500  cursor-text relative mb-4 w-full">
        <div>
            <h3>
                <div class="text-xl font-extrabold ">
                    {{ node.name }}
                </div>
            </h3>
            <p class="pt-2 text-blue-500"> {{ node.url }}</p>
            <div class="flex gap-2 pt-4">
                <Button variant="outline" class="">
                    <Icon name="wpf:statistics" class="w-5 h-5" />
                    统计
                </Button>
                <Button v-if="node.state === 'run'" variant="outline"
                    @click="updateNode(node.id, { state: 'suspend' })">
                    <Icon name="material-symbols:pause-outline" class="w-5 h-5" />
                    暂停
                </Button>
                <Button v-else variant="outline" @click="updateNode(node.id, { state: 'run' })">
                    <Icon name="iconamoon:player-start-duotone" class="w-5 h-5" />
                    启动
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger as-child>
                        <Button variant="outline">
                            <Icon name="fluent:delete-32-filled" class="w-5 h-5 bg-red-600 dark:bg-red-800 " />
                            删除
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent class="sm:w-auto w-5/6 rounded-md">
                        <AlertDialogHeader>
                            <AlertDialogTitle>删除该代理节点?</AlertDialogTitle>
                            <AlertDialogDescription>
                                该节点将被永久删除，不可恢复及撤销。确定要删除吗？
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <AlertDialogAction @click="delNode(node.id)"
                                class="bg-[#ca4d4d] hover:bg-[#c93636] dark:bg-[#961f1f] dark:hover:bg-[#ae3737] text-white ">
                                删除
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <div v-if="node.state === 'run'"
                class="p-1 absolute top-0 right-0 dark:bg-[#19312B] bg-[#E5FDF7]  rounded-tr-md rounded-bl-md text-[#30ddb2] ">
                运行中
            </div>
            <div v-else
                class="p-1 absolute top-0 right-0 dark:bg-[#2c1515] bg-[#ffe8e8] rounded-tr-md rounded-bl-md text-[#ca3131] ">
                已暂停
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
defineExpose({
    getNode
});
import type { Node } from "@/lib/type"
const route = useRoute();
const { get, put, del } = useApi();
const nodes = ref<Node[]>([]);

onMounted(async () => {
    getNode();
})
async function getNode() {
    nodes.value = await get(`/services/${route.params.id}/nodes`) as Node[];
}
async function updateNode(id: string, object: Object) {
    await put(`/services/${route.params.id}/nodes/${id}`, object);
    getNode();
}
async function delNode(id: string) {
    await del(`/services/${route.params.id}/nodes/${id}`);
    getNode();
}
</script>
