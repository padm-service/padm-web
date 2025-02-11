<template>
    <div class="flex sm:flex-row border rounded-md flex-col p-8  gap-4 dark:bg-[#313131] bg-[#e8e8e8]">
        <span class="text-5xl  flex items-center">🙂</span>
        <div class=" grid  xl:grid-cols-3 md:grid-cols-2 grid-cols-1 flex-1 gap-y-5">
            <div class="flex gap-2">
                <span class="dark:text-gray-400 text-gray-500">用户名称：</span>
                <span>{{ user?.name }}</span>
                <span
                    class="dark:text-blue-600 text-blue-500 cursor-pointer hover:text-blue-700 hover:dark:text-blue-500">修改</span>
            </div>
            <div class="flex gap-2">
                <span class="dark:text-gray-400 text-gray-500">
                    账户余额：</span>
                <span>{{ user?.balance }}</span>
                <span
                    class="dark:text-blue-600 text-blue-500 cursor-pointer hover:text-blue-700 hover:dark:text-blue-500">充值</span>
            </div>
            <div class="flex gap-2">
                <span class="dark:text-gray-400 text-gray-500">用户ID：</span>
                <span>{{ user?.id }}</span>
            </div>
            <div class="flex gap-2">
                <span class="dark:text-gray-400 text-gray-500">注册时间：</span>
                <span>{{ convertDate(user?.created_at) }}</span>
            </div>
            <div class="flex gap-2">
                <span class="dark:text-gray-400 text-gray-500">
                    联系邮箱：</span>
                <span>{{ user?.email }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const authStore = userAuthStore();
const { user } = storeToRefs(authStore);
</script>