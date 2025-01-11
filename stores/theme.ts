type Color =
  | 'zinc'
  | 'rose'
  | 'blue'
  | 'green'
  | 'orange'
  | 'red'
  | 'slate'
  | 'stone'
  | 'gray'
  | 'neutral'
  | 'yellow'
  | 'violet'


interface ThemeState {
  color: Color
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => {
    return {
      color: 'zinc',
    }
  },

  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: 'strict',
    }),
  },

  actions: {
    setColor(color: ThemeState['color']) {
      this.color = color
    },
  },
})