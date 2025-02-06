<template>
    <ScrollArea>
        <div class="container container-md">
            <div>
                <h2 class="font-bold text-xl">模型概述</h2>
                <p class="dark:text-gray-400 text-gray-500 block pt-2">
                    格式参考
                    <NuxtLink class="underline" href="https://www.markdownguide.org/basic-syntax" target="_blank">
                        Markdown 基础语法
                    </NuxtLink>
                </p>
            </div>
            <ContainerTextArea></ContainerTextArea>
            <div>
                <h2 class="font-bold text-xl">接口描述</h2>
                <p class="dark:text-gray-400 text-gray-500 pt-2">
                    格式参考
                    <NuxtLink class="underline" href="https://spec.openapis.org/oas/v3.1.1.html" target="_blank">
                        OpenAPI Specification Version 3.1.1
                    </NuxtLink>
                </p>
            </div>
            <ContainerTextArea></ContainerTextArea>
            <h2 class="font-bold text-xl">危险操作</h2>
            <div class="border rounded-md border-red-700">
                <div class="flex items-center justify-between px-3 py-2 border-b">
                    <div class="pt-2">
                        <h3 class="font-extrabold ">删除该模型</h3>
                        <p class="dark:text-gray-400 text-gray-500">删除后不可恢复，请慎重！</p>
                    </div>
                    <Button variant="destructive">删除</Button>
                </div>
                <div class="flex items-center justify-between px-3 py-2 ">
                    <div class="pt-2">
                        <h3 class="font-extrabold ">删除该模型</h3>
                        <p class="dark:text-gray-400 text-gray-500">删除后不可恢复，请慎重！</p>
                    </div>
                    <Button variant="destructive">删除</Button>
                </div>
            </div>
        </div>
    </ScrollArea>
</template>
<script setup lang="ts">

</script>
