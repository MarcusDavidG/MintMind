import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { X, Wallet, ExternalLink, AlertCircle, Smartphone } from 'lucide-react'
import { walletService } from '@/lib/wallet'
import { isMobile, isInWalletBrowser, getWalletInstallUrl, openMobileWallet } from '@/lib/mobile'

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: () => void
  error: string | null
  isConnecting: boolean
}

export default function WalletModal({ isOpen, onClose, onConnect, error, isConnecting }: WalletModalProps) {
  const mobile = isMobile()
  const inWalletBrowser = isInWalletBrowser()
  const isWalletAvailable = walletService.isWalletAvailable()

  const walletOptions = [
    {
      name: 'MetaMask',
      description: mobile ? 'Open MetaMask app' : 'Connect with MetaMask extension',
      icon: '🦊',
      url: getWalletInstallUrl('metamask'),
      action: mobile && !isWalletAvailable ? () => openMobileWallet('metamask') : null,
    },
    {
      name: 'Coinbase Wallet',
      description: mobile ? 'Open Coinbase Wallet app' : 'Connect with Coinbase Wallet',
      icon: '💳',
      url: getWalletInstallUrl('coinbase'),
      action: mobile && !isWalletAvailable ? () => openMobileWallet('coinbase') : null,
    },
    {
      name: 'Trust Wallet',
      description: mobile ? 'Open Trust Wallet app' : 'Any Web3-compatible wallet',
      icon: '🔐',
      url: mobile ? getWalletInstallUrl('trust') : '',
      action: mobile && !isWalletAvailable ? () => openMobileWallet('trust') : null,
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none overflow-y-auto">
            <div className="min-h-screen w-full flex items-center justify-center py-8 md:py-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-md pointer-events-auto my-auto"
              >
              <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-2xl">
                <CardHeader className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Wallet className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-2xl">Connect Wallet</CardTitle>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </motion.div>
                  )}

                  {/* Mobile: Show wallet options with deep links */}
                  {mobile && !isWalletAvailable && !inWalletBrowser ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                            Mobile Device Detected
                          </p>
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          Tap a wallet below to open or install
                        </p>
                      </div>

                      <div className="space-y-3">
                        {walletOptions.map((wallet) => (
                          <button
                            key={wallet.name}
                            onClick={wallet.action || undefined}
                            className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all active:scale-95"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-3xl">{wallet.icon}</span>
                                <div className="text-left">
                                  <p className="font-medium text-slate-800 dark:text-slate-100">
                                    {wallet.name}
                                  </p>
                                  <p className="text-xs text-slate-600 dark:text-slate-400">
                                    {wallet.description}
                                  </p>
                                </div>
                              </div>
                              <ExternalLink className="w-4 h-4 text-slate-400" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : isWalletAvailable ? (
                    /* Wallet Available - Show Connect Button */
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                        <p className="text-sm text-green-700 dark:text-green-300 font-medium mb-2">
                          ✓ {walletService.getWalletName()} Detected
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400">
                          {mobile ? 'Tap the button below to connect' : 'Click the button below to connect your wallet'}
                        </p>
                      </div>

                      <Button
                        onClick={onConnect}
                        disabled={isConnecting}
                        className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg"
                      >
                        {isConnecting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="mr-2"
                            >
                              <Wallet className="w-5 h-5" />
                            </motion.div>
                            Connecting...
                          </>
                        ) : (
                          <>
                            <Wallet className="mr-2 w-5 h-5" />
                            Connect Wallet
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    /* No Wallet - Show Installation Options */
                    <div className="space-y-4">
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                        <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                          No Web3 wallet detected
                        </p>
                        <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                          Please install a wallet extension to continue
                        </p>
                      </div>

                      <div className="space-y-3">
                        {walletOptions.map((wallet) => (
                          <a
                            key={wallet.name}
                            href={wallet.url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all ${
                              !wallet.url ? 'pointer-events-none opacity-60' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-3xl">{wallet.icon}</span>
                                <div>
                                  <p className="font-medium text-slate-800 dark:text-slate-100">
                                    {wallet.name}
                                  </p>
                                  <p className="text-xs text-slate-600 dark:text-slate-400">
                                    {wallet.description}
                                  </p>
                                </div>
                              </div>
                              {wallet.url && (
                                <ExternalLink className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Info */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                      By connecting your wallet, you agree to store your IP assets locally.
                      Your data is saved per wallet address.
                    </p>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
