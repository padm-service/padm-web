<template>
    <ScrollArea class="flex-1">
        <div class="container container-2xl">
            <ContainerHeader title="用户管理"></ContainerHeader>
            <Serach></Serach>
            <UserTable></UserTable>
        </div>
    </ScrollArea>
</template>

<script lang="ts" setup>
import Serach from './serach.vue';
import UserTable from './userTable.vue'
const { getUsers } = useUsers();
const { userList } = storeToRefs(userAuthStore());
definePageMeta({
    layout: 'personal'
})
onMounted(async () => {
    userList.value = await getUsers();
})
</script>