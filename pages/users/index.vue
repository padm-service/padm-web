<template>
    <ScrollArea class="flex-1">
        <div class="container container-2xl">
            <ContainerHeader title="用户管理"></ContainerHeader>
            <UserTable :allUsers></UserTable>
        </div>
    </ScrollArea>
</template>

<script lang="ts" setup>

import UserTable from './userTable.vue'
const { getUsers } = useUsers();
const { userList } = storeToRefs(userAuthStore());
const allUsers = ref<string[]>([]);
definePageMeta({
    layout: 'personal'
})
onMounted(async () => {
    userList.value = await getUsers();
    allUsers.value = userList.value.map(item => item.id);
})
</script>