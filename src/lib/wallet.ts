import { ethers } from 'ethers'

declare global {
  interface Window {
    ethereum?: any
  }
}

export class WalletService {
  private provider: any = null

  constructor() {
    if (typeof window !== 'undefined' && window.ethereum) {
      this.provider = window.ethereum
    }
  }

  isWalletAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.ethereum
  }

  async connect(): Promise<{ address: string; balance: string }> {
    if (!this.isWalletAvailable()) {
      throw new Error(
        'No Web3 wallet detected. Please install MetaMask, Coinbase Wallet, or another Web3 wallet extension.'
      )
    }

    try {
      // Request account access
      const accounts = await this.provider.request({
        method: 'eth_requestAccounts',
      })

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please unlock your wallet.')
      }

      const address = accounts[0]

      // Get balance
      let balance = '0'
      try {
        const ethersProvider = new ethers.providers.Web3Provider(this.provider)
        const balanceWei = await ethersProvider.getBalance(address)
        balance = ethers.utils.formatEther(balanceWei)
      } catch (error) {
        console.warn('Failed to get balance:', error)
        // Continue even if balance fetch fails
      }

      return {
        address,
        balance,
      }
    } catch (error: any) {
      console.error('Failed to connect wallet:', error)
      
      // Provide user-friendly error messages
      if (error.code === 4001) {
        throw new Error('Connection request rejected. Please approve the connection in your wallet.')
      } else if (error.code === -32002) {
        throw new Error('Connection request pending. Please check your wallet extension.')
      } else {
        throw new Error(error.message || 'Failed to connect wallet. Please try again.')
      }
    }
  }

  async disconnect(): Promise<void> {
    // Note: Most wallets don't support programmatic disconnect
    // Users need to disconnect from their wallet extension directly
    console.log('Wallet disconnected from app')
  }

  async getAccounts(): Promise<string[]> {
    if (!this.isWalletAvailable()) {
      return []
    }

    try {
      const accounts = await this.provider.request({
        method: 'eth_accounts',
      })
      return accounts || []
    } catch (error) {
      console.error('Failed to get accounts:', error)
      return []
    }
  }

  onAccountsChanged(callback: (accounts: string[]) => void): void {
    if (!this.isWalletAvailable()) return

    this.provider.on('accountsChanged', callback)
  }

  onChainChanged(callback: (chainId: string) => void): void {
    if (!this.isWalletAvailable()) return

    this.provider.on('chainChanged', callback)
  }

  removeListeners(): void {
    if (!this.isWalletAvailable()) return

    this.provider.removeAllListeners('accountsChanged')
    this.provider.removeAllListeners('chainChanged')
  }

  formatAddress(address: string): string {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  getWalletName(): string {
    if (!this.isWalletAvailable()) return 'Unknown'

    if (window.ethereum.isMetaMask) return 'MetaMask'
    if (window.ethereum.isCoinbaseWallet) return 'Coinbase Wallet'
    if (window.ethereum.isRabby) return 'Rabby'
    if (window.ethereum.isTrust) return 'Trust Wallet'
    
    return 'Web3 Wallet'
  }
}

export const walletService = new WalletService()
