import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Settings from './pages/Settings'
import { useStore } from './store/useStore'

const queryClient = new QueryClient()

function App() {
  const { theme } = useStore()

  useEffect(() => {
    // Initialize theme on app load
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/generate" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
