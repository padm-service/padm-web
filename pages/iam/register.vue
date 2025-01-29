<template>
    <div class="flex justify-center h-full items-center">
        <Card class="min-w-80 sm:min-w-96">
            <CardHeader>
                <CardTitle>注册</CardTitle>
                <CardDescription class="flex">已有账号？去
                    <NuxtLink to="/iam/login" class="text-blue-500 hover:underline">登录</NuxtLink>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div class="grid items-center w-full gap-4">
                        <div class="flex flex-col space-y-1.5">
                            <Label for="name">邮箱</Label>
                            <Input id="name" placeholder="请输入邮箱" />
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label for="name">密码</Label>
                            <Input id="name" placeholder="请输入密码" />
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label for="name">密码</Label>
                            <Input id="name" placeholder="请再次输入密码" />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter class="flex justify-end px-6 pb-6">
                <Button class="bg-blue-500 text-white hover:bg-blue-700">注册</Button>
            </CardFooter>
        </Card>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'entrance'
})
</script>
