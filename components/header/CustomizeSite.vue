<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="outline" size="icon">
                <Icon name="icon-park-outline:theme" class="w-5 h-5" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-5">
            <DropdownMenuLabel>主题颜色</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
                type="single"
                class="flex-wrap"
                :modelValue="color"
                @update:modelValue="handleColorChange"
            >
                <DropdownMenuRadioItem
                    v-for="colorName in colorList"
                    :value="colorName"
                    :key="colorName"
                >
                    <div class="mr-2" :class="colorName">
                        <div class="w-3 h-3 bg-primary rounded-sm"></div>
                    </div>
                    {{ useCapitalize(colorName) }}
                </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup>
const themeStore = useThemeStore()
const { setColor } = themeStore
const { color } = storeToRefs(themeStore)
const colorList = [
    'neutral',
    'blue',
    'green',
    'orange',
    'red',
    'yellow',
    'violet'
]
const handleColorChange = (value) => {
    if (!value) {
        value = colorList[0]
    }
    setColor(value)
}
</script>

<style scoped>
button[data-state='on'] {
    @apply border-2 border-primary;
}
</style>
