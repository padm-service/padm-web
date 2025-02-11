<template>
    <div class="flex justify-center flex-1 items-center  bg-gradient-to-br   from-[#f3e8ff]  to-[#e0e7ff]
              dark:from-[#2c2c54]  dark:to-[#003b70] ">
        <div class="min-w-80 sm:min-w-96 rounded-xl border p-5 dark:bg-[#1a1a1a] bg-[#f8f9fa]">
            <div class="flex  flex-col gap-2 items-center">
                <span class="text-3xl font-bold">登录</span>
                <div>
                    <span class="dark:text-gray-400 text-gray-500">还没有账号？去</span>
                    <NuxtLink to="/iam/register" class="text-blue-500 hover:underline">注册</NuxtLink>
                </div>
            </div>
            <div>
                <div class="flex flex-col mt-5 gap-4">
                    <div>
                        <p class="dark:text-gray-400 text-gray-500 mb-1">选择登录方式</p>
                        <Select v-model="loginWay">
                            <SelectTrigger id="framework" class="bg-[#e8f0fe] dark:bg-[#1e293b]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="PP">用户密码</SelectItem>
                                <SelectItem value="OTP">临时验证码</SelectItem>
                                <SelectItem value="AK">APIKEY</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <form @submit="onSubmit">
                        <FormField v-slot="{ componentField }" name="email">
                            <FormItem v-auto-animate>
                                <FormLabel class="dark:text-gray-400 text-gray-500">电子邮箱
                                </FormLabel>
                                <FormControl>
                                    <Input type="email" autocomplete v-bind="componentField" placeholder="请输入邮箱"
                                        class="!my-1 bg-[#e8f0fe] dark:bg-[#1e293b]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="secret">
                            <FormItem v-auto-animate>
                                <FormLabel class="dark:text-gray-400 text-gray-500">密码</FormLabel>
                                <FormControl>
                                    <Input type="password" autocomplete v-bind="componentField" placeholder="请输入密码"
                                        class="!my-1 bg-[#e8f0fe] dark:bg-[#1e293b]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <Button type="submit" class="mt-2 w-full bg-[#3b82f6] text-white hover:bg-[#2563eb] "
                            :disabled="pending">
                            <span v-if="!pending">登录</span>
                            <span v-else>
                                正在登录
                            </span>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { zLoginForm, type LoginForm } from "@/lib/formSchema"
import { useCustomForm } from '@/composables/useCustomForm'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { toast } from 'vue-sonner';
definePageMeta({
    layout: 'entrance'
})
const authStore = userAuthStore();
const pending = ref(false);
const loginWay = ref("PP");
const { post } = useApi();

const Submit = async (values: LoginForm) => {
    try {
        pending.value = true;
        await post('/iam/login', values)
        await authStore.fetchUser();
        toast.success("登录成功！");
        pending.value = false;
        await navigateTo('/services');
    } catch (error: any) {
        if (error?.message === "Unauthorized")
            toast.error("账号或密码错误！");
        else
            toast.error("网络错误，请稍后再试！");
        pending.value = false;
    }
}


const { onSubmit } = useCustomForm(zLoginForm, Submit)


</script>
