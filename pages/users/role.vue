<template>
    <Sheet>
        <SheetTrigger as-child>
            <Button variant="ghost" class="text-green-500 hover:text-green-500">
                <Icon name="carbon:user-role" class="dark:bg-green-500 "></Icon>权限
            </Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>{{ props.user.name }}的权限审批</SheetTitle>
                <SheetDescription>
                    勾选模型即可授予权限，取消勾选收回权限。
                </SheetDescription>
            </SheetHeader>
            <ScrollArea class="h-80 rounded-md border max-w-96 mt-2 dark:bg-[#313131] bg-[#e8e8e8]">
                <div class="p-4 ">
                    <div v-for="service in serviceList" :key="service.id">
                        <div class="flex items-center gap-4">
                            <Checkbox :id="service.id" :checked="selectSercices.includes(service.id)"
                                @update:checked="checked => handleCheck(service.id, checked)" />
                            <label :for="service.id" class="text-md hover:text-blue-600 cursor-pointer ">
                                {{ service.schema.info.title }}
                            </label>
                        </div>
                        <Separator class="my-2" />
                    </div>
                </div>
            </ScrollArea>
            <SheetFooter class="flex flex-row justify-between mt-4">
                <Button variant="outline" @click="allSelect()"> <span>全选</span></Button>
                <SheetClose as-child>
                    <Button @click=submit()>
                        提交
                    </Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>
</template>
<script setup lang="ts">
import { toast } from 'vue-sonner';

const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
});
const { userList } = storeToRefs(userAuthStore());
const selectSercices = ref<String[]>([]);
const allService = ref<string[]>([]);
const { serviceList } = storeToRefs(serviceStore());
const { updateUsers } = useUsers();
onMounted(() => {
    allService.value = serviceList.value.map(item => item.id);
    selectSercices.value = props.user.permission;
})
const handleCheck = (id: string, checked: boolean) => {
    selectSercices.value = checked
        ? [...selectSercices.value, id]
        : selectSercices.value.filter(item => item !== id)
};
const allSelect = () => {
    if (selectSercices.value.length)
        selectSercices.value = [];
    else
        selectSercices.value = allService.value;
    console.log(selectSercices.value);
};
const submit = async () => {
    userList.value = await updateUsers({ ids: [props.user.id], update: { permission: selectSercices.value } });
    toast.success("修改成功");
};
</script>