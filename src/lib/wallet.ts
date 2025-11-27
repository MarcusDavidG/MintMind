import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import { ethers } from 'ethers'

const APP_NAME = 'MintMind'
const APP_LOGO_URL = 'https://mintmind-three.vercel.app/logo.png'

export class WalletService {
  private coinbaseWallet: CoinbaseWalletSDK
  private ethereum: any

  constructor() {
    this.coinbaseWallet = new CoinbaseWalletSDK({
      appName: APP_NAME,
      appLogoUrl: APP_LOGO_URL,
    })

    this.ethereum = this.coinbaseWallet.makeWeb3Provider()
  }

  async connect(): Promise<{ address: string; balance: string }> {
    try {
      const accounts = await this.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found')
      }

      const address = accounts[0]
      const provider = new ethers.providers.Web3Provider(this.ethereum)
      const balance = await provider.getBalance(address)
      const balanceInEth = ethers.utils.formatEther(balance)

      return {
        address,
        balance: balanceInEth,
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      throw error
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.ethereum.request({
        method: 'wallet_revokePermissions',
        params: [{ eth_accounts: {} }],
      })
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
    }
  }

  async getAccounts(): Promise<string[]> {
    try {
      const accounts = await this.ethereum.request({
        method: 'eth_accounts',
      })
      return accounts || []
    } catch (error) {
      console.error('Failed to get accounts:', error)
      return []
    }
  }

  onAccountsChanged(callback: (accounts: string[]) => void): void {
    this.ethereum.on('accountsChanged', callback)
  }

  onChainChanged(callback: (chainId: string) => void): void {
    this.ethereum.on('chainChanged', callback)
  }

  formatAddress(address: string): string {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }
}

export const walletService = new WalletService()
