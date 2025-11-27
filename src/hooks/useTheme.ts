import { useEffect } from 'react'
import { useStore } from '@/store/useStore'

export function useTheme() {
  const { theme } = useStore()

  useEffect(() => {
    // Apply theme on mount and when it changes
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return { theme }
}
