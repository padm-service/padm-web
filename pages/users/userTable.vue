<template>
    <div class="rounded-md border mt-2">
        <Table class=" text-md ">
            <TableHeader>
                <TableRow>
                    <TableHead class="w-5 flex items-center">
                        <Checkbox></Checkbox>
                    </TableHead>
                    <TableHead>
                        头像
                    </TableHead>
                    <TableHead>
                        用户名
                    </TableHead>
                    <TableHead>用户ID</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>
                        上次使用
                    </TableHead>
                    <TableHead>
                        用户状态
                    </TableHead>
                    <TableHead>
                        操作
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="user in userList" :key="user.id">
                    <TableCell class="w-5">
                        <Checkbox></Checkbox>
                    </TableCell>
                    <TableCell> {{ user.icon }}</TableCell>
                    <TableCell class="font-bold">
                        {{ user.name }}
                    </TableCell>
                    <TableCell>{{ user.id }}</TableCell>
                    <TableCell>{{ convertDate(user.created_at) }}</TableCell>
                    <TableCell>
                        {{ convertDate(user.updated_at) }}
                    </TableCell>
                    <TableCell>
                        <div class="flex items-center gap-2">
                            <Label for="state">启用</Label>
                            <Switch id="state" :default-checked="user.state === 'normal'"
                                @update:checked="checked => sigleUpdate(user.id, checked)" />
                        </div>
                    </TableCell>
                    <TableCell>
                        <Popover>
                            <PopoverTrigger>
                                <Button size="icon" variant="ghost">
                                    <Icon name="fa-solid:ellipsis-h" class="bg-blue-500"></Icon>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="border flex flex-col w-fit">
                                <Role :user="user"></Role>
                                <AlertDialog>
                                    <AlertDialogTrigger as-child>
                                        <Button variant="ghost" class="text-red-600 hover:text-red-600">
                                            <Icon name="fluent:delete-32-filled" class="bg-red-600"></Icon>
                                            注销
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle class="text-red-500">你确定要注销该用户吗？</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                此操作不可逆转，被注销后该用户所有的信息都会失去。
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>取消</AlertDialogCancel>
                                            <AlertDialogAction @click="logOff(user.id)"
                                                class="bg-[#ca4d4d] hover:bg-[#c93636] dark:bg-[#961f1f] dark:hover:bg-[#ae3737] text-white">
                                                确定</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

<script lang="ts" setup>
import { toast } from 'vue-sonner';
import Role from './role.vue';
const selectUsers = ref<String[]>([]);
const { getServices } = useServices();
const { updateUsers, delUsers } = useUsers();
const { userList } = storeToRefs(userAuthStore());
const { serviceList } = storeToRefs(serviceStore());
onMounted(async () => {
    serviceList.value = await getServices();
});
const sigleUpdate = async (id: string, checked: boolean) => {
    const state = checked ? 'normal' : "disable";
    userList.value = await updateUsers({ ids: [id], update: { state } })
}
const logOff = async (id: string) => {
    userList.value = await delUsers(id);
    toast.success("注销成功！");
}
</script>
