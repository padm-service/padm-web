<template>
    <Button variant="outline" size="icon" @click="toggleColorMode">
        <ColorScheme placeholder="...">
            <Icon :name="themeList[colorMode.value]" class="w-5 h-5" />
        </ColorScheme>
    </Button>
</template>

<script setup>
const colorMode = useColorMode()
const themeList = {
    light: 'line-md:sun-rising-loop',
    dark: 'line-md:sunny-filled-loop-to-moon-filled-loop-transition'
}
function toggleColorMode() {
    colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
    colorMode.preference = colorMode.value
}
</script>

<style scoped>
button[data-state='on'] {
    @apply border-2 border-primary;
}
</style>