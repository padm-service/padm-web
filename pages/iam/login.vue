<template>
    <div class="flex justify-center h-full items-center">
        <Card class="min-w-80 sm:min-w-96">
            <CardHeader>
                <CardTitle>登录</CardTitle>
                <CardDescription class="flex"
                    >还没有账号？去
                    <NuxtLink
                        to="/iam/register"
                        class="text-blue-500 hover:underline"
                        >注册</NuxtLink
                    >
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div class="grid items-center w-full gap-4">
                        <div class="flex flex-col space-y-1.5">
                            <Label for="loginway">登录方式</Label>
                            <Select>
                                <SelectRoot>
                                    <SelectTrigger id="framework">
                                        <SelectValue
                                            placeholder="请选择登录方式"
                                        />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="password">
                                            用户密码
                                        </SelectItem>
                                        <SelectItem value="OPT">
                                            临时验证码
                                        </SelectItem>
                                        <SelectItem value="APIKEY"
                                            >APIKEY
                                        </SelectItem>
                                    </SelectContent>
                                </SelectRoot>
                            </Select>
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label for="email">邮箱</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="请输入邮箱"
                            />
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label for="name">密码</Label>
                            <Input id="name" placeholder="请输入密码" />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter class="flex justify-end px-6 pb-6">
                <Button class="bg-blue-500 text-white hover:bg-blue-700"
                    >登录</Button
                >
            </CardFooter>
        </Card>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'default'
})
</script>
