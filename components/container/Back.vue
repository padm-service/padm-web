<template>
    <Button variant="ghost" size="icon" @click="router.back()">
        <Icon name="typcn:arrow-back" class="w-7 h-7"></Icon>
    </Button>
</template>
<script setup>
const router = useRouter()
</script>