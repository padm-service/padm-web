<template>
    <div class="flex justify-center flex-1 items-center  bg-gradient-to-br   from-[#f3e8ff]  to-[#e0e7ff]
              dark:from-[#2c2c54]  dark:to-[#003b70] ">
        <div class="min-w-80 sm:min-w-96 rounded-xl border p-5 dark:bg-[#1a1a1a] bg-[#f8f9fa]">
            <div class="flex  flex-col gap-2 items-center">
                <span class="text-3xl font-bold">注册</span>
                <div>
                    <span class="dark:text-gray-400 text-gray-500">已有账号，去</span>
                    <NuxtLink to="/iam/login" class="text-blue-500 hover:underline">登录</NuxtLink>
                </div>
            </div>
            <div>
                <div class="flex flex-col mt-5 gap-4">
                    <form @submit="onSubmit">
                        <FormField v-slot="{ componentField }" name="email">
                            <FormItem v-auto-animate>
                                <FormLabel class="dark:text-gray-400 text-gray-500">电子邮箱
                                </FormLabel>
                                <FormControl>
                                    <Input type="email" v-bind="componentField" placeholder="请输入邮箱"
                                        class="!my-1 bg-[#e8f0fe] dark:bg-[#1e293b]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="secret">
                            <FormItem v-auto-animate>
                                <FormLabel class="dark:text-gray-400 text-gray-500">密码</FormLabel>
                                <FormControl>
                                    <Input type="password" v-bind="componentField" placeholder="请输入密码"
                                        class="!my-1 bg-[#e8f0fe] dark:bg-[#1e293b]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="confirmSecret">
                            <FormItem v-auto-animate>
                                <FormLabel class="dark:text-gray-400 text-gray-500">密码</FormLabel>
                                <FormControl>
                                    <Input type="password" v-bind="componentField" placeholder="请确认你的密码"
                                        class="!my-1 bg-[#e8f0fe] dark:bg-[#1e293b]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <Button type="submit" class="mt-2 w-full bg-[#3b82f6] text-white hover:bg-[#2563eb]"
                            :disabled="pending">
                            <span v-if="!pending">注册</span>
                            <span v-else>
                                正在注册
                            </span>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { zRegisterForm, type RegisterForm } from "@/lib/formSchema"
import { useCustomForm } from '@/composables/useCustomForm'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { toast } from 'vue-sonner';
definePageMeta({
    layout: 'entrance'
})
const authStore = userAuthStore();
const pending = ref(false);
const { post } = useApi();

const Submit = async (values: RegisterForm) => {
    try {
        pending.value = true;
        const { confirmSecret, ...form } = values;
        await post('/iam/register', { ...form, name: randomUsername() })
        toast.success("注册成功！");
        pending.value = false;
        await navigateTo('/iam/login');
    } catch (error: any) {
        if (error?.message === "Conflict")
            toast.error("该邮箱已被注册！");
        else
            toast.error("网络错误，请稍后再试！");
        pending.value = false;
    }
}


const { onSubmit } = useCustomForm(zRegisterForm, Submit)


</script>
