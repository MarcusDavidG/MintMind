import { IPAsset } from '@/store/useStore'

const STORAGE_PREFIX = 'mintmind_'
const IP_ASSETS_KEY = 'ip_assets'

export class StorageService {
  // Save IP assets for a specific wallet
  saveIPAssets(walletAddress: string, assets: IPAsset[]): void {
    try {
      const key = `${STORAGE_PREFIX}${IP_ASSETS_KEY}_${walletAddress.toLowerCase()}`
      localStorage.setItem(key, JSON.stringify(assets))
    } catch (error) {
      console.error('Failed to save IP assets:', error)
    }
  }

  // Load IP assets for a specific wallet
  loadIPAssets(walletAddress: string): IPAsset[] {
    try {
      const key = `${STORAGE_PREFIX}${IP_ASSETS_KEY}_${walletAddress.toLowerCase()}`
      const data = localStorage.getItem(key)
      if (!data) return []
      return JSON.parse(data)
    } catch (error) {
      console.error('Failed to load IP assets:', error)
      return []
    }
  }

  // Clear IP assets for a specific wallet
  clearIPAssets(walletAddress: string): void {
    try {
      const key = `${STORAGE_PREFIX}${IP_ASSETS_KEY}_${walletAddress.toLowerCase()}`
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Failed to clear IP assets:', error)
    }
  }

  // Get all wallets that have data
  getAllWallets(): string[] {
    try {
      const wallets: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith(`${STORAGE_PREFIX}${IP_ASSETS_KEY}_`)) {
          const wallet = key.replace(`${STORAGE_PREFIX}${IP_ASSETS_KEY}_`, '')
          wallets.push(wallet)
        }
      }
      return wallets
    } catch (error) {
      console.error('Failed to get all wallets:', error)
      return []
    }
  }

  // Get total IP assets count across all wallets
  getTotalIPAssetsCount(): number {
    try {
      const wallets = this.getAllWallets()
      let total = 0
      wallets.forEach((wallet) => {
        const assets = this.loadIPAssets(wallet)
        total += assets.length
      })
      return total
    } catch (error) {
      console.error('Failed to get total IP assets count:', error)
      return 0
    }
  }

  // Export all data for backup
  exportAllData(): Record<string, IPAsset[]> {
    try {
      const data: Record<string, IPAsset[]> = {}
      const wallets = this.getAllWallets()
      wallets.forEach((wallet) => {
        data[wallet] = this.loadIPAssets(wallet)
      })
      return data
    } catch (error) {
      console.error('Failed to export all data:', error)
      return {}
    }
  }
}

export const storageService = new StorageService()
