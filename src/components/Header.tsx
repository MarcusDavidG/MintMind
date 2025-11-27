import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Sparkles, Moon, Sun, Wallet, LogOut, Loader2 } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { motion, AnimatePresence } from 'framer-motion'
import { walletService } from '@/lib/wallet'

export default function Header() {
  const { theme, toggleTheme, walletAddress, isConnectingWallet, connectWallet, disconnectWallet } = useStore()

  const handleConnect = async () => {
    try {
      await connectWallet()
    } catch (error) {
      console.error('Wallet connection failed:', error)
    }
  }

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
          
          {/* Wallet Connect/Disconnect */}
          <AnimatePresence mode="wait">
            {!walletAddress ? (
              <motion.div
                key="connect"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Button
                  onClick={handleConnect}
                  disabled={isConnectingWallet}
                  variant="outline"
                  size="sm"
                  className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700 hover:from-purple-100 hover:to-pink-100"
                >
                  {isConnectingWallet ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet
                    </>
                  )}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="connected"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2"
              >
                <div className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700 rounded-lg">
                  <span className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    {walletService.formatAddress(walletAddress)}
                  </span>
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="ghost"
                  size="sm"
                  className="dark:hover:bg-slate-800"
                  title="Disconnect Wallet"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  )
}
