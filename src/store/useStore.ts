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
  
  setCurrentGeneration: (result: GenerationResult | null) => void
  setIsGenerating: (isGenerating: boolean) => void
  setIsRegistering: (isRegistering: boolean) => void
  setAutoRegister: (autoRegister: boolean) => void
  setWalletAddress: (address: string | null) => void
  
  addIPAsset: (
    generation: GenerationResult,
    registration: StoryRegistrationResult,
    title: string,
    description: string
  ) => void
  clearCurrentGeneration: () => void
}

export const useStore = create<AppState>((set) => ({
  ipAssets: [],
  currentGeneration: null,
  isGenerating: false,
  isRegistering: false,
  autoRegister: true,
  walletAddress: null,
  
  setCurrentGeneration: (result) => set({ currentGeneration: result }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setIsRegistering: (isRegistering) => set({ isRegistering }),
  setAutoRegister: (autoRegister) => set({ autoRegister }),
  setWalletAddress: (address) => set({ walletAddress: address }),
  
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
