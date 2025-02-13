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
                <Button v-if="node.state === '运行中'" variant="outline" @click="updateNode(node.id, { state: '暂停中' })">
                    <Icon name="material-symbols:pause-outline" class="w-5 h-5" />
                    暂停
                </Button>
                <Button v-else variant="outline" @click="updateNode(node.id, { state: '运行中' })">
                    <Icon name="iconamoon:player-start-duotone" class="w-5 h-5" />
                    启动
                </Button>
                <Button variant="outline" @click="delNode(node.id)">
                    <Icon name="fluent:delete-32-filled" class="w-5 h-5 bg-red-600 dark:bg-red-800" />
                    删除
                </Button>
            </div>
            <div v-if="node.state === '运行中'"
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
