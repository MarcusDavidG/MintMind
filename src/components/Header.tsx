import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Sparkles, Moon, Sun, Wallet, LogOut } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { motion, AnimatePresence } from 'framer-motion'
import { walletService } from '@/lib/wallet'
import { useState } from 'react'
import WalletModal from './WalletModal'

export default function Header() {
  const { theme, toggleTheme, walletAddress, isConnectingWallet, connectWallet, disconnectWallet } = useStore()
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)

  const handleConnect = async () => {
    setConnectionError(null)
    try {
      await connectWallet()
      setShowWalletModal(false)
    } catch (error: any) {
      console.error('Wallet connection failed:', error)
      setConnectionError(error.message || 'Failed to connect wallet')
    }
  }

  const handleOpenModal = () => {
    setConnectionError(null)
    setShowWalletModal(true)
  }

  return (
    <header className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-lg md:text-xl font-bold text-primary dark:text-purple-400">
          <div className="p-1.5 md:p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
            <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-white" />
          </div>
          MintMind
        </Link>
        
        <nav className="flex items-center gap-3 md:gap-6">
          <Link to="/generate" className="text-xs md:text-sm font-medium hover:text-primary dark:hover:text-purple-400 transition-colors dark:text-slate-300 hidden sm:block">
            Generate
          </Link>
          <Link to="/gallery" className="text-xs md:text-sm font-medium hover:text-primary dark:hover:text-purple-400 transition-colors dark:text-slate-300 hidden sm:block">
            Gallery
          </Link>
          <Link to="/settings" className="text-xs md:text-sm font-medium hover:text-primary dark:hover:text-purple-400 transition-colors dark:text-slate-300 hidden sm:block">
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
                <Moon className="h-4 w-4 md:h-5 md:w-5 text-slate-700 dark:text-yellow-400" />
              ) : (
                <Sun className="h-4 w-4 md:h-5 md:w-5 text-orange-500" />
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
                  onClick={handleOpenModal}
                  disabled={isConnectingWallet}
                  variant="outline"
                  size="sm"
                  className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700 hover:from-purple-100 hover:to-pink-100 text-xs md:text-sm"
                >
                  <Wallet className="mr-0 sm:mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Connect</span>
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
                <div className="px-2 md:px-3 py-1 md:py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700 rounded-lg">
                  <span className="text-xs md:text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-1 md:gap-2">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse" />
                    {walletService.formatAddress(walletAddress)}
                  </span>
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="ghost"
                  size="sm"
                  className="dark:hover:bg-slate-800 p-2"
                  title="Disconnect Wallet"
                >
                  <LogOut className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Wallet Modal */}
      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnect={handleConnect}
        error={connectionError}
        isConnecting={isConnectingWallet}
      />
    </header>
  )
}
