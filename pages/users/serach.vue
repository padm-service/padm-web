<template>
    <div class="flex gap-2 sm:flex-row flex-col">
        <div class="flex gap-2">
            <Button variant="outline" class="max-w-36" @click="batchUpdate({ state: 'normal' })">
                <Icon name="material-symbols:lock-open-outline" class="w-5 h-5"></Icon>
                批量启用
            </Button>
            <Button variant="outline" class="max-w-36" @click="batchUpdate({ state: 'disable' })">
                <Icon name="material-symbols:lock-outline-sharp" class="w-5 h-5"></Icon>
                批量禁用
            </Button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { toast } from 'vue-sonner';
const { userList } = storeToRefs(userAuthStore());
const { updateUsers } = useUsers();
const emit = defineEmits(['update:selectUsers']);
const props = defineProps({
    selectUsers: {
        type: Array,
        require: true
    }
});
const batchUpdate = async (object: object) => {
    if (props.selectUsers?.length) {
        userList.value = await updateUsers({ ids: props.selectUsers, update: object });
        emit('update:selectUsers', []);
        toast.success("修改成功");
    }
    else
        toast.info("未选择用户!");
}
</script>