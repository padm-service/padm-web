<template>
    <div class="dark:bg-[#313131] bg-[#e8e8e8] border w-full p-5 rounded-md gap-6 flex flex-col">
        <div class="flex  gap-4">
            <Icon name="icon-park-outline:check-one" class="bg-green-500 w-5 h-5 mt-1"></Icon>
            <div class="flex gap-4 flex-col justify-between">
                <div class="flex gap-2 text-lg">
                    <span>登陆密码</span>
                    <Dialog v-model:open="openState">
                        <DialogTrigger as-child>
                            <span
                                class="dark:text-blue-600 text-blue-500 cursor-pointer hover:text-blue-700 hover:dark:text-blue-500">修改</span>
                        </DialogTrigger>
                        <DialogContent class="w-5/6 sm:w-full rounded-md">
                            <DialogHeader>
                                <DialogTitle>修改密码</DialogTitle>
                            </DialogHeader>
                            <form @submit="onSubmit">
                                <FormField v-slot="{ componentField }" name="oldPass">
                                    <FormItem>
                                        <FormLabel>原密码<span class="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="password" v-bind="componentField" placeholder="请输入原密码" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </FormField>
                                <div class="mt-2">
                                    <FormField v-slot="{ componentField }" name="newPass">
                                        <FormItem>
                                            <FormLabel>新密码<span class="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="password" v-bind="componentField" placeholder="请输入新密码" />
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
                </div>
                <span class="text-lg dark:text-gray-400 text-gray-500">安全性高的密码可以使账号更安全，建议您定期更换密码</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { zUpdatePass, type UpdatePass } from '~/lib/formSchema';
import { toast } from 'vue-sonner'
const pending = ref(false);
const openState = ref(false);
const { updateUser } = useUsers();
const { clearUser } = userAuthStore();
const Submit = async (values: UpdatePass) => {
    try {
        pending.value = true;
        await updateUser({ updates: { secret: values.newPass }, oldPass: values.oldPass });
        clearUser();
        toast.success("修改成功！");
        openState.value = false;
        pending.value = false;
    } catch (error: any) {
        toast.error("原密码错误,未修改成功");
        pending.value = false;
        openState.value = false;
    }
}
const { onSubmit } = useCustomForm(zUpdatePass, Submit)
</script>