export interface IPMetadata {
  title: string
  description: string
  creator: string
  contentType: 'text' | 'image' | 'video'
  contentUrl?: string
  originalPrompt: string
  model: string
  generatedAt: string
  seed?: number
}

export interface StoryRegistrationResult {
  success: boolean
  assetId: string
  txHash?: string
  ipId?: string
  tokenId?: string
  error?: string
}

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const API_KEY = import.meta.env.VITE_STORY_API_KEY

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function mockRegisterIPAsset(_metadata: IPMetadata): Promise<StoryRegistrationResult> {
  await delay(1000 + Math.random() * 1500)

  const mockAssetId = `story-asset-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  const mockTxHash = `0x${Math.random().toString(16).substring(2, 66)}`
  const mockIpId = `0x${Math.random().toString(16).substring(2, 42)}`

  if (Math.random() > 0.9) {
    return {
      success: false,
      assetId: '',
      error: 'Mock registration failed: Network error',
    }
  }

  return {
    success: true,
    assetId: mockAssetId,
    txHash: mockTxHash,
    ipId: mockIpId,
    tokenId: Math.floor(Math.random() * 10000).toString(),
  }
}

export async function registerIPAsset(
  metadata: IPMetadata
): Promise<StoryRegistrationResult> {
  if (USE_MOCK || !API_KEY) {
    console.log('[Story Protocol - Mock Mode] Registering IP Asset:', metadata)
    return mockRegisterIPAsset(metadata)
  }

  throw new Error(
    'Story Protocol API integration not fully implemented. Set VITE_USE_MOCK=true in .env'
  )
}

export async function getIPAsset(assetId: string) {
  if (USE_MOCK || !API_KEY) {
    await delay(500)
    return {
      assetId,
      metadata: {
        title: 'Mock IP Asset',
        description: 'This is a mock IP asset for development',
        contentType: 'text',
      },
      status: 'registered',
      registeredAt: new Date().toISOString(),
    }
  }

  throw new Error(
    'Story Protocol API integration not fully implemented. Set VITE_USE_MOCK=true in .env'
  )
}

export async function listIPAssets(_owner?: string) {
  if (USE_MOCK || !API_KEY) {
    await delay(800)
    return []
  }

  throw new Error(
    'Story Protocol API integration not fully implemented. Set VITE_USE_MOCK=true in .env'
  )
}
