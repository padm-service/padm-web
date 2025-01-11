<template>
    <Button variant="outline" size="icon" @click="toggleColorMode">
        <Icon :name="themeList[colorMode.preference]" class="w-5 h-5" />
    </Button>
</template>

<script setup>
const colorMode = useColorMode()
const themeList = {
    light: 'line-md:sun-rising-loop',
    dark: 'line-md:sunny-filled-loop-to-moon-filled-loop-transition'
}
const colorList = ['blue', 'green', 'orange', 'red', 'yellow', 'violet']
const toggleColorMode = () => {
    colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
    colorMode.preference = colorMode.value
}
</script>

<style scoped>
button[data-state='on'] {
    @apply border-2 border-primary;
}
</style>
