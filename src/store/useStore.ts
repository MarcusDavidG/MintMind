import { create } from 'zustand'
import { GenerationResult } from '@/lib/abv'
import { StoryRegistrationResult } from '@/lib/story'

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
  theme: 'light' | 'dark'
  
  setCurrentGeneration: (result: GenerationResult | null) => void
  setIsGenerating: (isGenerating: boolean) => void
  setIsRegistering: (isRegistering: boolean) => void
  setAutoRegister: (autoRegister: boolean) => void
  setWalletAddress: (address: string | null) => void
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
  
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
  
  addIPAsset: (generation, registration, title, description) =>
    set((state) => ({
      ipAssets: [
        {
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
        },
        ...state.ipAssets,
      ],
    })),
  
  clearCurrentGeneration: () => set({ currentGeneration: null }),
}))
