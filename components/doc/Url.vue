<template>
    <div class="border w-fit p-2 rounded-md flex gap-2 items-center max-w-full sm:flex-row flex-col">
        <Badge class="rounded-md p-1 uppercase bg-green-950" variant="outline">get</Badge>
        <span ref="idElement" class="dark:text-gray-400 text-gray-500">
            https://api.platform.archivemodel.cn/assistants/{id}/chats/{chat_id}</span>
        <Icon name="solar:copy-line-duotone" class="cursor-pointer hover:text-blue-500 transition-colors bg-green-600">
        </Icon>
    </div>
</template>

<script setup lang="ts">

</script>