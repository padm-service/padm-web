<template>
    <div class="rounded-md border mt-8">
        <Table class=" text-md ">
            <TableHeader>
                <TableRow>
                    <TableHead>
                        知识库名称
                    </TableHead>
                    <!-- <TableHead>使用空间</TableHead> -->
                    <TableHead>创建时间</TableHead>
                    <TableHead>
                        更新时间
                    </TableHead>
                    <TableHead>
                        操作
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <NuxtLink :to="`/knowledgeBase/${colletion.id}`" v-for="colletion in colletionList" :key="colletion.id"
                    class="contents">
                    <TableRow class="cursor-pointer ">
                        <TableCell class="font-bold">
                            📚{{ colletion.name }}
                        </TableCell>
                        <!-- <TableCell>{{ colletion.used }}</TableCell> -->
                        <TableCell>{{ convertDateTime(colletion.created_at) }}</TableCell>
                        <TableCell>
                            {{ convertDateTime(colletion.updated_at) }}
                        </TableCell>
                        <TableCell>
                            <DropdownMenu v-model:open="openState[colletion.id]">
                                <DropdownMenuTrigger as-child>
                                    <Button size="icon" variant="ghost">
                                        <Icon name="fa-solid:ellipsis-h" class="text-blue-500" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent class="min-w-0">
                                    <DropdownMenuGroup class="flex flex-col">
                                        <Dialog>
                                            <DialogTrigger as-child>
                                                <Button variant="ghost">
                                                    <Icon name="line-md:edit-full-twotone" class="bg-blue-500"></Icon>编辑
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent class="w-5/6 sm:w-full rounded-md">
                                                <DialogHeader>
                                                    <DialogTitle>{{ colletion.name }}</DialogTitle>
                                                </DialogHeader>
                                                <form @submit="onSubmit" :initial-values="{
                                                    name: colletion.name,
                                                    description: colletion.description
                                                }" :initial-touched="false">
                                                    <FormField v-slot="{ componentField }" name="name">
                                                        <FormItem>
                                                            <FormLabel>名称 <span class="text-red-500">*</span>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input v-bind="componentField"
                                                                    placeholder="请输入该知识库名称" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    </FormField>
                                                    <div class="mt-2">
                                                        <FormField v-slot="{ componentField }" name="description">
                                                            <FormItem>
                                                                <FormLabel>描述 <span class="text-red-500">*</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Textarea v-bind="componentField"
                                                                        placeholder="该该知识库的描述"
                                                                        class="resize-none h-24" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        </FormField>
                                                    </div>
                                                    <div class="flex mt-4 justify-end gap-2">
                                                        <Button variant="outline">
                                                            <DialogClose aria-label="Close">
                                                                取消
                                                            </DialogClose>
                                                        </Button>
                                                        <Button type="submit" :disabled="pending">
                                                            <div v-if="!pending">修改</div>
                                                            <div v-else class="flex gap-2 items-center">
                                                                <Pending></Pending>
                                                                正在创建
                                                            </div>
                                                        </Button>
                                                    </div>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                        <AlertDialog v-model:open="delState">
                                            <AlertDialogTrigger as-child>
                                                <Button variant="ghost">
                                                    <Icon name="fluent:delete-32-filled"
                                                        class="bg-red-600 dark:bg-red-800">
                                                    </Icon>
                                                    删除
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent class="w-5/6 sm:w-full rounded-md">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle class="text-red-500">
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription class="text-red-500">
                                                        此操作无法撤消！这将从服务器中删除该知识库以及相关文件的向量化数据。
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>取消</AlertDialogCancel>
                                                    <Button variant="destructive"
                                                        @click="handledel(colletion.id)">删除</Button>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    <Separator class="w-0" />
                </NuxtLink>
            </TableBody>
        </Table>
    </div>
</template>

<script lang="ts" setup>
import { toast } from 'vue-sonner';
import { zColletionForm, type ColletionForm } from '~/lib/formSchema';
const delState = ref(false);
const openState = ref<Record<string, boolean>>({});
const pending = ref(false);
const { getColletions, deleteColletion, updateColletion } = useColletions();
const { colletionList } = storeToRefs(colletionStore());
onMounted(async () => {
    await getList();
})
async function getList() {
    colletionList.value = await getColletions();
    colletionList.value.forEach(c => {
        openState.value[c.id] = false;
    });
}
const handledel = async (id: string) => {
    await deleteColletion(id);
    openState.value[id] = false;
    delState.value = false;
    toast.success("删除成功");
}
const Submit = async (values: ColletionForm) => {
    try {
        pending.value = true;
        await updateColletion('', values);
        await getList();
        toast.success("创建成功！");
        pending.value = false;
    } catch (error: any) {
        pending.value = false;
    }
}
const { onSubmit } = useCustomForm(zColletionForm, Submit);
</script>
