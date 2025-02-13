<template>
    <div class="rounded-md border mt-8">
        <Table class=" text-md ">
            <TableHeader>
                <TableRow>
                    <TableHead>
                    </TableHead>
                    <TableHead>
                        名称
                    </TableHead>
                    <TableHead>API key</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>
                        上次使用时间
                    </TableHead>
                    <TableHead>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <template v-if="keyList?.length">
                    <TableRow v-for="key in keyList" :key="key.id" v-auto-animate>
                        <TableCell class="font-bold">
                            🗝️
                        </TableCell>
                        <TableCell class="font-bold">
                            {{ key.purpose }}
                        </TableCell>
                        <TableCell>{{ format(key) }}</TableCell>
                        <TableCell>{{ convertDate(key?.created_at) }}</TableCell>
                        <TableCell>
                            {{ convertDate(key?.updated_at) }}
                        </TableCell>
                        <TableCell>
                            <AlertDialog>
                                <AlertDialogTrigger as-child>
                                    <Button variant="ghost" class="dark:hover:bg-[#3d0505] hover:bg-[#d8cfca]"
                                        size="icon">撤销</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>提示</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            确定撤销{{ format(key) }}吗？该操作不可逆转。
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>取消</AlertDialogCancel>
                                        <AlertDialogAction @click="delKey(key.id)"
                                            class="bg-[#ca4d4d] hover:bg-[#c93636] dark:bg-[#961f1f] dark:hover:bg-[#ae3737] text-white">
                                            我确定
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                    </TableRow>
                </template>
                <TableRow v-else>
                    <TableCell :colspan="6" class="h-24 text-center">
                        暂未创建API key
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

<script lang="ts" setup>
import { type Key } from '@/lib/type'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
const { getKey, keyList, delKey } = useKeys();
const { keyListState } = storeToRefs(apiStore());
onMounted(async () => {
    await getKey();
});
watch((keyListState), async () => {
    await getKey();
    keyListState.value = false;
})
function format(key: Key) {
    if (!key) return "";
    const { id, prefix, secret_truncated } = key;
    return `${prefix}-${id?.slice(4, 8) ?? ""}${"*".repeat(6)}${secret_truncated}`;
}


</script>
