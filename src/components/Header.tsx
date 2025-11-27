import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Sparkles, Moon, Sun } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { motion } from 'framer-motion'

export default function Header() {
  const { theme, toggleTheme } = useStore()

  return (
    <header className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary dark:text-purple-400">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          MintMind
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link to="/generate" className="text-sm font-medium hover:text-primary dark:hover:text-purple-400 transition-colors dark:text-slate-300">
            Generate
          </Link>
          <Link to="/gallery" className="text-sm font-medium hover:text-primary dark:hover:text-purple-400 transition-colors dark:text-slate-300">
            Gallery
          </Link>
          <Link to="/settings" className="text-sm font-medium hover:text-primary dark:hover:text-purple-400 transition-colors dark:text-slate-300">
            Settings
          </Link>
          
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'dark' ? (
                <Moon className="h-5 w-5 text-slate-700 dark:text-yellow-400" />
              ) : (
                <Sun className="h-5 w-5 text-orange-500" />
              )}
            </motion.div>
          </motion.button>
          
          <Button variant="outline" size="sm" className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
            Connect Wallet
          </Button>
        </nav>
      </div>
    </header>
  )
}
