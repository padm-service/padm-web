<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon">
                <a class="text-3xl">🙂</a>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel class="w-40 font-semibold text-lg">用户23454</DropdownMenuLabel>
            <DropdownMenuLabel class="font-normal text-gray-400">账号ID: 690658643</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuRadioGroup class="font-bold justify-self-center">
                <DropdownMenuRadioItem class="pr-8">个人中心
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem><span class="text-red-600 pr-8 ">退出登录</span>
                </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup></script>

<style scoped></style>
