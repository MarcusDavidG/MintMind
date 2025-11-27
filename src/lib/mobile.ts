/**
 * Mobile wallet detection and deep linking utilities
 */

export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

export const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export const isAndroid = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return /Android/.test(navigator.userAgent)
}

/**
 * Open mobile wallet app with deep link
 */
export const openMobileWallet = (walletType: 'metamask' | 'coinbase' | 'trust' | 'rainbow' = 'metamask') => {
  const currentUrl = window.location.href
  const encodedUrl = encodeURIComponent(currentUrl)
  
  // Deep link schemes for different wallets
  const deepLinks: Record<string, string> = {
    metamask: `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`,
    coinbase: `https://go.cb-w.com/dapp?cb_url=${encodedUrl}`,
    trust: `trust://open_url?coin_id=60&url=${encodedUrl}`,
    rainbow: `rainbow://open?url=${encodedUrl}`,
  }

  const deepLink = deepLinks[walletType]
  
  if (isIOS()) {
    // For iOS, try to open the deep link
    window.location.href = deepLink
  } else if (isAndroid()) {
    // For Android, open deep link
    window.location.href = deepLink
  } else {
    // Fallback to web
    window.open(deepLink, '_blank')
  }
}

/**
 * Check if MetaMask mobile app is available
 */
export const isMetaMaskMobileAvailable = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return !!window.ethereum && !!window.ethereum.isMetaMask
}

/**
 * Get installation URL for mobile wallet
 */
export const getWalletInstallUrl = (walletType: 'metamask' | 'coinbase' | 'trust' | 'rainbow' = 'metamask'): string => {
  const iosUrls: Record<string, string> = {
    metamask: 'https://apps.apple.com/app/metamask/id1438144202',
    coinbase: 'https://apps.apple.com/app/coinbase-wallet/id1278383455',
    trust: 'https://apps.apple.com/app/trust-crypto-bitcoin-wallet/id1288339409',
    rainbow: 'https://apps.apple.com/app/rainbow-ethereum-wallet/id1457119021',
  }

  const androidUrls: Record<string, string> = {
    metamask: 'https://play.google.com/store/apps/details?id=io.metamask',
    coinbase: 'https://play.google.com/store/apps/details?id=org.toshi',
    trust: 'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp',
    rainbow: 'https://play.google.com/store/apps/details?id=me.rainbow',
  }

  if (isIOS()) {
    return iosUrls[walletType]
  } else if (isAndroid()) {
    return androidUrls[walletType]
  } else {
    // Desktop - return browser extension download page
    const desktopUrls: Record<string, string> = {
      metamask: 'https://metamask.io/download/',
      coinbase: 'https://www.coinbase.com/wallet/downloads',
      trust: 'https://trustwallet.com/download',
      rainbow: 'https://rainbow.me/download',
    }
    return desktopUrls[walletType]
  }
}

/**
 * Detect if user is in a mobile wallet's in-app browser
 */
export const isInWalletBrowser = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const userAgent = navigator.userAgent.toLowerCase()
  
  return (
    userAgent.includes('metamask') ||
    userAgent.includes('trust') ||
    userAgent.includes('coinbase') ||
    userAgent.includes('rainbow')
  )
}
