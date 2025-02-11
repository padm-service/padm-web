<template>
    <div class="flex items-center">
        <ContainerBack></ContainerBack>
        <header class="mx-auto ">
            <span class="font-bold pb-4  text-md sm:text-xl">API Key</span>
        </header>
        <Dialog v-model:open="openState">
            <DialogTrigger as-child>
                <Button variant="ghost" class="bg-[#3b82f6] text-white hover:text-white hover:bg-[#2563eb] ">
                    + 创建API Key
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:w-full w-4/5 rounded-md">
                <DialogHeader>
                    <div v-if="!oneTime">
                        <DialogTitle>新建API Key</DialogTitle>
                        <DialogDescription class="mt-2">
                            API key名称，用来区分API key.
                        </DialogDescription>
                    </div>
                    <div v-else>
                        <DialogTitle>生成成功</DialogTitle>
                        <DialogDescription class="mt-2 dark:text-green-400 text-green-500">
                            请立刻保存新生成的 API key, 它不会再显示，如果丢失或泄露，则需重新生成。
                        </DialogDescription>
                    </div>
                </DialogHeader>
                <div v-if="!oneTime">
                    <form @submit="onSubmit">
                        <FormField v-slot="{ componentField }" name="purpose">
                            <FormItem v-auto-animate>
                                <FormControl>
                                    <Input v-bind="componentField" placeholder="请输入API key名称" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <div class="flex mt-2 justify-end gap-2">
                            <Button variant="outline">
                                <DialogClose aria-label="Close">
                                    取消
                                </DialogClose>
                            </Button>
                            <Button type="submit" class="bg-[#3b82f6] text-white hover:bg-[#2563eb] "
                                :disabled="pending">
                                <span v-if="!pending">创建</span>
                                <span v-else>
                                    正在创建
                                </span>
                            </Button>
                        </div>
                    </form>
                </div>
                <div v-else>
                    <Input disabled class="dark:bg-gray-500 bg-gray-400 !opacity-100 text-white" v-model="oneTime" />
                    <div class="flex mt-2 justify-end gap-2">
                        <Button variant="outline">
                            <DialogClose aria-label="Close">
                                完成
                            </DialogClose>
                        </Button>
                        <Button @click="copy(oneTime)">
                            复制
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { zKeyForm, type KeyForm } from "@/lib/formSchema"
import { useCustomForm } from '@/composables/useCustomForm'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { toast } from 'vue-sonner';
const { getKey } = useKeys();
const { post } = useApi();
const { keyListState } = storeToRefs(apiStore());
const pending = ref(false);
const oneTime = ref();
const openState = ref();
watch(openState, () => {
    oneTime.value = "";
});

const Submit = async (values: KeyForm) => {
    try {
        pending.value = true;
        const data = await post('/key', { ...values, services: [] });
        keyListState.value = true;
        oneTime.value = data as string;
        toast.success("创建成功！");
        await getKey();
        pending.value = false;
    } catch (error: any) {
        console.log(error);
        pending.value = false;
    }
}
const { onSubmit } = useCustomForm(zKeyForm, Submit)
</script>