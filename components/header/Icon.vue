<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon">
                <a class="text-3xl">🙂</a>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel class="w-40 font-semibold text-lg"
                >用户23454</DropdownMenuLabel
            >
            <DropdownMenuLabel class="font-normal text-gray-400"
                >账号ID: 690658643</DropdownMenuLabel
            >
            <DropdownMenuSeparator />

            <DropdownMenuRadioGroup class="font-bold">
                <DropdownMenuRadioItem>个人中心 </DropdownMenuRadioItem>
                <DropdownMenuRadioItem class="text-red-500 hover:text-red-500"
                    >退出登录
                </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup></script>

<style scoped></style>
