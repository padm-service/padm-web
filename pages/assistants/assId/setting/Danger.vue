<template>
    <div class="max-w-2xl">
        <h2 class="font-bold text-xl">危险操作</h2>
        <div class="border rounded-md border-red-700 mt-2">
            <div class="flex items-center justify-between px-3 py-2 border-b">
                <div class="pt-2">
                    <h3 class="font-extrabold ">访问控制</h3>
                    <p class="text-gray-400">设置谁能访问到该专家</p>
                </div>
                <Button variant="destructive">设置</Button>
            </div>
            <div class="flex items-center justify-between px-3 py-2 ">
                <div class="pt-2">
                    <h3 class="font-extrabold ">删除该专家</h3>
                    <p class="text-gray-400">删除后不可恢复，请慎重！</p>
                </div>
                <Button variant="destructive">删除</Button>
            </div>
        </div>
    </div>
</template>