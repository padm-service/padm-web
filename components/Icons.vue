<template>
    <Icon :name="finalIconName" :style="finalIconStyle"></Icon>
</template>

<script setup>
import { computed } from 'vue';
import { iconConfig } from '~/lib/iconConfig';
// 定义组件的 props
const props = defineProps({
    type: {
        type: String,
        required: true,
    },
    style: {
        type: Object,
        default: () => ({}),
    },
});

// 动态获取图标配置
const getIconConfig = (type) => {
    return iconConfig.find(item => item.type === type);
};

// 计算最终的图标名称
const finalIconName = computed(() => {
    const config = getIconConfig(props.type);
    return config ? config.name : '';
});

// 计算最终的图标样式
const finalIconStyle = computed(() => {
    const config = getIconConfig(props.type);
    const baseStyle = config ? { color: config.color } : {};
    return { ...baseStyle, ...props.style };
});
</script>