<template>
    <div class="px-4 sm:px-8  flex flex-1" v-if="isLoading">
        <div class=" py-8 sm:px-8 flex-1 flex flex-col">
            <div class="pb-6">
                <ContainerHeader title="数字模型"></ContainerHeader>
                <div class="flex justify-end">
                    <Button @click="create" v-if="user && ['admin', 'superadmin'].includes(user.scope)" class="bg-blue-500 text-white hover:bg-blue-700 ">
                        + 新建
                    </Button>
                </div>
            </div>
            <ContainerServiceCard></ContainerServiceCard>
        </div>
        <ContainerSerach></ContainerSerach>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'router'
    //middleware:'auth.global'
})
const { createService, getServices } = useServices();
const { service, serviceList } = storeToRefs(serviceStore());
const isLoading = ref(false);
const authStore = userAuthStore();
const { user } = storeToRefs(authStore);
import { toast } from 'vue-sonner'
onMounted(async () => {
    serviceList.value = await getServices();
    isLoading.value = true;
})
async function create() {
    service.value = await createService();
    if(user.value?.scope==='admin'||user.value?.scope==='superadmin'){
       navigateTo(`/services/${service.value?.id}/setting`); 
    }
    else{
        toast.info("抱歉，您没有该权限");
    }

    
}

</script>
