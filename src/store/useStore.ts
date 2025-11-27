import { create } from 'zustand'
import { GenerationResult } from '@/lib/abv'
import { StoryRegistrationResult } from '@/lib/story'
import { walletService } from '@/lib/wallet'
import { storageService } from '@/lib/storage'

export interface IPAsset {
  id: string
  title: string
  description: string
  type: 'text' | 'image' | 'video'
  content: string
  imageUrl?: string
  videoUrl?: string
  storyAssetId: string
  storyTxHash?: string
  storyIpId?: string
  metadata: {
    model: string
    seed: number
    generatedAt: string
    prompt: string
  }
  registeredAt: string
}

interface AppState {
  ipAssets: IPAsset[]
  currentGeneration: GenerationResult | null
  isGenerating: boolean
  isRegistering: boolean
  autoRegister: boolean
  walletAddress: string | null
  walletBalance: string | null
  isConnectingWallet: boolean
  theme: 'light' | 'dark'
  
  setCurrentGeneration: (result: GenerationResult | null) => void
  setIsGenerating: (isGenerating: boolean) => void
  setIsRegistering: (isRegistering: boolean) => void
  setAutoRegister: (autoRegister: boolean) => void
  setWalletAddress: (address: string | null) => void
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
  
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  loadUserData: (address: string) => void
  
  addIPAsset: (
    generation: GenerationResult,
    registration: StoryRegistrationResult,
    title: string,
    description: string
  ) => void
  clearCurrentGeneration: () => void
}

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

export const useStore = create<AppState>((set, get) => ({
  ipAssets: [],
  currentGeneration: null,
  isGenerating: false,
  isRegistering: false,
  autoRegister: true,
  walletAddress: null,
  walletBalance: null,
  isConnectingWallet: false,
  theme: getInitialTheme(),
  
  setCurrentGeneration: (result) => set({ currentGeneration: result }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setIsRegistering: (isRegistering) => set({ isRegistering }),
  setAutoRegister: (autoRegister) => set({ autoRegister }),
  setWalletAddress: (address) => set({ walletAddress: address }),
  setTheme: (theme) => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
    set({ theme })
  },
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    set({ theme: newTheme })
  },
  
  // Wallet Connection
  connectWallet: async () => {
    set({ isConnectingWallet: true })
    try {
      const { address, balance } = await walletService.connect()
      set({ walletAddress: address, walletBalance: balance })
      
      // Load user's IP assets from storage
      const savedAssets = storageService.loadIPAssets(address)
      set({ ipAssets: savedAssets })
      
      // Listen for account changes
      walletService.onAccountsChanged((accounts) => {
        if (accounts.length === 0) {
          get().disconnectWallet()
        } else {
          const newAddress = accounts[0]
          set({ walletAddress: newAddress })
          get().loadUserData(newAddress)
        }
      })
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      throw error
    } finally {
      set({ isConnectingWallet: false })
    }
  },
  
  disconnectWallet: () => {
    set({
      walletAddress: null,
      walletBalance: null,
      ipAssets: [],
    })
    walletService.disconnect()
  },
  
  loadUserData: (address: string) => {
    const savedAssets = storageService.loadIPAssets(address)
    set({ ipAssets: savedAssets })
  },
  
  addIPAsset: (generation, registration, title, description) => {
    const newAsset: IPAsset = {
      id: registration.assetId,
      title,
      description,
      type: generation.type,
      content: generation.content,
      imageUrl: generation.imageUrl,
      videoUrl: generation.videoUrl,
      storyAssetId: registration.assetId,
      storyTxHash: registration.txHash,
      storyIpId: registration.ipId,
      metadata: generation.metadata,
      registeredAt: new Date().toISOString(),
    }
    
    const updatedAssets = [newAsset, ...get().ipAssets]
    set({ ipAssets: updatedAssets })
    
    // Save to storage if wallet is connected
    const walletAddress = get().walletAddress
    if (walletAddress) {
      storageService.saveIPAssets(walletAddress, updatedAssets)
    }
  },
  
  clearCurrentGeneration: () => set({ currentGeneration: null }),
}))
