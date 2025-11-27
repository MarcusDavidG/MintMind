import { describe, it, expect, beforeEach } from 'vitest'
import { useStore } from '../store/useStore'

describe('App Store', () => {
  beforeEach(() => {
    useStore.setState({ ipAssets: [], currentGeneration: null })
  })

  it('initializes with empty state', () => {
    const state = useStore.getState()
    
    expect(state.ipAssets).toEqual([])
    expect(state.currentGeneration).toBeNull()
    expect(state.isGenerating).toBe(false)
    expect(state.isRegistering).toBe(false)
    expect(state.autoRegister).toBe(true)
  })

  it('can add IP asset', () => {
    const generation = {
      type: 'text' as const,
      content: 'Test content',
      metadata: {
        model: 'gpt-4',
        seed: 123,
        generatedAt: '2025-11-27T00:00:00Z',
        prompt: 'test prompt',
      },
    }

    const registration = {
      success: true,
      assetId: 'asset-123',
      txHash: '0xabc',
      ipId: '0xdef',
    }

    useStore.getState().addIPAsset(generation, registration, 'Test Title', 'Test Description')
    
    const state = useStore.getState()
    expect(state.ipAssets).toHaveLength(1)
    expect(state.ipAssets[0].title).toBe('Test Title')
    expect(state.ipAssets[0].storyAssetId).toBe('asset-123')
  })

  it('can toggle auto-register', () => {
    expect(useStore.getState().autoRegister).toBe(true)
    
    useStore.getState().setAutoRegister(false)
    expect(useStore.getState().autoRegister).toBe(false)
    
    useStore.getState().setAutoRegister(true)
    expect(useStore.getState().autoRegister).toBe(true)
  })

  it('can clear current generation', () => {
    const generation = {
      type: 'text' as const,
      content: 'Test',
      metadata: {
        model: 'gpt-4',
        seed: 1,
        generatedAt: '2025-11-27T00:00:00Z',
        prompt: 'test',
      },
    }

    useStore.getState().setCurrentGeneration(generation)
    expect(useStore.getState().currentGeneration).not.toBeNull()
    
    useStore.getState().clearCurrentGeneration()
    expect(useStore.getState().currentGeneration).toBeNull()
  })
})
