<template>
    <ScrollArea>
        <div class="container container-md">
            <Dialog v-model:open="openState">
                <DialogTrigger as-child>
                    <Button variant="outline" class="max-w-16">
                        + 添加
                    </Button>
                </DialogTrigger>
                <DialogContent class="w-5/6 sm:w-full rounded-md">
                    <DialogHeader>
                        <DialogTitle>添加节点</DialogTitle>
                        <DialogDescription class="mt-2">
                            节点url：如原始节点为https://example.cn/service，并且文档将/service作为一个请求，此时这里的代理节点应填https//:example.cn
                        </DialogDescription>
                    </DialogHeader>
                    <form @submit="onSubmit">
                        <FormField v-slot="{ componentField }" name="url">
                            <FormItem>
                                <FormControl>
                                    <Input v-bind="componentField" placeholder="请输入该节点url" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <div class="mt-2">
                            <FormField v-slot="{ componentField }" name="name">
                                <FormItem>
                                    <FormLabel>标识</FormLabel>
                                    <FormControl>
                                        <Input v-bind="componentField" placeholder="url标识" />
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
                                <div v-if="!pending">添加</div>
                                <div v-else class="flex gap-2 items-center">
                                    <Pending></Pending>
                                    正在添加
                                </div>
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            <ContainerNodeCard ref="nodeCard"></ContainerNodeCard>
        </div>
    </ScrollArea>
</template>
<script setup lang="ts">
import { zNodeForm, type NodeForm } from "@/lib/formSchema"
import { useCustomForm } from '@/composables/useCustomForm'
import { toast } from 'vue-sonner';
const { post } = useApi();
const nodeCard = ref();
const pending = ref(false);
const openState = ref(false);
const route = useRoute();
const Submit = async (values: NodeForm) => {
    try {
        pending.value = true;
        await post(`/services/${route.params.id}/nodes`, { ...values, state: "运行中", serviceId: route.params.id });
        if (nodeCard.value) {
            nodeCard.value.getNode();
        }
        toast.success("添加成功！");
        openState.value = false;
        pending.value = false;
    } catch (error: any) {
        pending.value = false;
    }
}
const { onSubmit } = useCustomForm(zNodeForm, Submit)

</script>
