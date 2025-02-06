<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon">
                <a class="text-3xl">🙂</a>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel class="w-40 font-semibold text-lg">用户23454</DropdownMenuLabel>
            <DropdownMenuLabel class="font-normal dark:text-gray-400 text-gray-500">账号ID: 690658643</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuRadioGroup class="font-bold justify-self-center">
                <NuxtLink to="/setting">
                    <DropdownMenuRadioItem class=" cursor-pointer justify-center">个人中心
                    </DropdownMenuRadioItem>
                </NuxtLink>
                <NuxtLink to="/services">
                    <DropdownMenuRadioItem class="cursor-pointer justify-center">控制台
                    </DropdownMenuRadioItem>
                </NuxtLink>
                <NuxtLink to="/iam/login">
                    <DropdownMenuRadioItem><span class="text-red-600  cursor-pointer justify-center">退出登录</span>
                    </DropdownMenuRadioItem>
                </NuxtLink>
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup></script>

<style scoped></style>
