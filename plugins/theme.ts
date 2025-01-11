export default defineNuxtPlugin(() => {
  const themeStore = useThemeStore()

  const { color } = storeToRefs(themeStore)

  const colorClassName = computed(() => {
    if (!color.value) {
      return 'zinc'
    }
    return color.value
  })

  useHead({
    htmlAttrs: {
      class: [colorClassName],
    },
  })
})
