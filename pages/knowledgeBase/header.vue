<template>
    <div class="flex items-center">
        <ContainerBack></ContainerBack>
        <header class="mx-auto ">
            <span class="font-bold pb-4  text-md sm:text-xl"> 知识库</span>
        </header>
        <Dialog v-model:open="openState">
            <DialogTrigger as-child>
                <Button variant="outline" class=" bg-blue-500 text-white hover:bg-blue-700 hover:text-white">
                    + 创建知识库
                </Button>
            </DialogTrigger>
            <DialogContent class="w-5/6 sm:w-full rounded-md">
                <DialogHeader>
                    <DialogTitle>新建知识库</DialogTitle>
                </DialogHeader>
                <form @submit="onSubmit">
                    <FormField v-slot="{ componentField }" name="name">
                        <FormItem>
                            <FormLabel>名称 <span class="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input v-bind="componentField" placeholder="请输入该知识库名称" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <div class="mt-2">
                        <FormField v-slot="{ componentField }" name="description">
                            <FormItem>
                                <FormLabel>描述 <span class="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Textarea v-bind="componentField" placeholder="该该知识库的描述" class="resize-none h-24" />
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
                            <div v-if="!pending">创建</div>
                            <div v-else class="flex gap-2 items-center">
                                <Pending></Pending>
                                正在创建
                            </div>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import { zColletionForm, type ColletionForm } from '~/lib/formSchema';
import { toast } from 'vue-sonner';
definePageMeta({
    layout: 'router'
})
const { getColletions, createColletion } = useColletions();
const { colletionList } = storeToRefs(colletionStore());

const pending = ref(false);
const openState = ref(false);
const Submit = async (values: ColletionForm) => {
    try {
        pending.value = true;
        await createColletion(values);
        await getList();
        toast.success("创建成功！");
        openState.value = false;
        pending.value = false;
    } catch (error: any) {
        pending.value = false;
    }
}
async function getList() {
    colletionList.value = await getColletions();
}
const { onSubmit } = useCustomForm(zColletionForm, Submit)
</script>