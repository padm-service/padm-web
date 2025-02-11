<template>

    <div class="flex items-center font-bold gap-2">
        <Icons :type="props.invoice.name.split('.').pop()" class="w-5 h-5 sm:w-7 sm:h-7"></Icons>
        <div>
            <span>{{ props.invoice.name }}</span>
            <div class="flex items-center gap-1">
                <p class="dark:text-gray-400 text-gray-500 text-xs"> ID:<span>{{ props.invoice.id
                        }}</span></p>
                <Icon name="solar:copy-line-duotone" class="cursor-pointer hover:text-blue-500 transition-colors"
                    @click="copy(props.invoice.id)">
                </Icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    invoice: {
        type: Object,
        required: true
    }
});

</script>