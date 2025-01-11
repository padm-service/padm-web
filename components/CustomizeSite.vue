<template>
  <div>
    <Button variant="outline" size="icon" @click="toggleColorMode">
      <Icon :name="themeList[colorMode.preference]" />
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline" size="icon">
          <Icon name="icon-park-outline:theme" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-5">
        <DropdownMenuLabel>主题颜色</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup type="single" class="flex-wrap" :modelValue="color"
          @update:modelValue="handleColorChange">
          <DropdownMenuRadioItem v-for="colorName in colorList" :value="colorName" :key="colorName">
            <div class="mr-2" :class="colorName">
              <div class="w-3 h-3 bg-primary rounded-sm"></div>
            </div>
            {{ useCapitalize(colorName) }}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script setup>
import { reactive } from 'vue';


const colorMode = useColorMode();
const themeStore = useThemeStore();

const { setColor, setRadius } = themeStore;

const { color, radius } = storeToRefs(themeStore);

const themeList = {
  light: 'line-md:sun-rising-loop',
  dark: 'line-md:sunny-filled-loop-to-moon-filled-loop-transition'
};
const colorList = [
  'zinc',
  'blue',
  'green',
  'orange',
  'red',
  'yellow',
  'violet',
]


const toggleColorMode = () => {
  colorMode.value = colorMode.value === 'light' ? 'dark' : 'light';
  colorMode.preference = colorMode.value;
}
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