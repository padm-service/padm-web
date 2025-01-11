type Color =
  |'neutral'
  | 'blue'
  | 'green'
  | 'orange'
  | 'red'
  | 'yellow'
  | 'violet'


interface ThemeState {
  color: Color
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => {
    return {
      color: 'neutral',
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