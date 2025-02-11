<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon">
                <span class="text-3xl">🙂</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel class="w-40 font-semibold text-lg">{{ user?.name }}</DropdownMenuLabel>
            <!-- <DropdownMenuLabel class="font-normal dark:text-gray-400 text-gray-500">账号ID: {{ user?.scope }}
            </DropdownMenuLabel> -->
            <DropdownMenuSeparator />
            <DropdownMenuGroup class="font-bold justify-self-center">
                <NuxtLink to="/setting" class="contents">
                    <DropdownMenuItem class=" cursor-pointer justify-center">个人中心
                    </DropdownMenuItem>
                </NuxtLink>
                <NuxtLink to="/services" class="contents">
                    <DropdownMenuItem class="cursor-pointer justify-center">控制台
                    </DropdownMenuItem>
                </NuxtLink>
                <DropdownMenuItem class="text-red-600  cursor-pointer justify-center " @click="logout">退出登录
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
<script setup lang="ts">
const authStore = userAuthStore();
const { user } = storeToRefs(authStore);
const logout = () => {
    authStore.clearUser();
};
</script>