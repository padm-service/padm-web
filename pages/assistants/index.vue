<template>
    <div class="px-4 sm:px-8  flex flex-1 flex-col">
        <div class="container container-xl ">
            <div>
                <ContainerHeader title="数字专家"></ContainerHeader>
                <div class="flex pt-4 gap-4">
                    <Dialog v-model:open="openState">
                        <DialogTrigger as-child>
                            <Button class="bg-blue-500 text-white hover:bg-blue-700 ">
                                + 新建
                            </Button>
                        </DialogTrigger>
                        <DialogContent class="w-5/6 sm:w-full rounded-md">
                            <DialogHeader>
                                <DialogTitle>创建专家</DialogTitle>
                            </DialogHeader>
                            <form @submit="onSubmit">
                                <FormField v-slot="{ componentField }" name="name">
                                    <FormItem>
                                        <FormLabel>名称</FormLabel>
                                        <FormControl>
                                            <Input v-bind="componentField" placeholder="请输入该助手名称" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </FormField>
                                <div class="mt-2">
                                    <FormField v-slot="{ componentField }" name="description">
                                        <FormItem>
                                            <FormLabel>描述</FormLabel>
                                            <FormControl>
                                                <Textarea v-bind="componentField" placeholder="该助手的描述" />
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
                    <Input type="text" placeholder="关键词搜索" class="dark:bg-[#313131] bg-[#e8e8e8] max-w-72" />
                </div>
            </div>
            <ContainerAssistantCard></ContainerAssistantCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { zAssistantForm, type AssistantForm } from '~/lib/formSchema';
import { toast } from 'vue-sonner';
definePageMeta({
    layout: 'router'
})
const { post } = useApi();
const { getAssistants } = useAssistants();
const { assistantList } = storeToRefs(assistantStore());
onMounted(async () => {
    await getList();
})
const pending = ref(false);
const openState = ref(false);
const Submit = async (values: AssistantForm) => {
    try {
        pending.value = true;
        await post(`/assistants`, { ...values, services: [] });
        await getList();
        toast.success("创建成功！");
        openState.value = false;
        pending.value = false;
    } catch (error: any) {
        pending.value = false;
    }
}
async function getList() {
    assistantList.value = await getAssistants();
}
const { onSubmit } = useCustomForm(zAssistantForm, Submit)

</script>
