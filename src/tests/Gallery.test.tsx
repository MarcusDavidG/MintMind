import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Gallery from '../pages/Gallery'
import { useStore } from '../store/useStore'

const renderGallery = () => {
  return render(
    <BrowserRouter>
      <Gallery />
    </BrowserRouter>
  )
}

describe('Gallery Page', () => {
  it('shows empty state when no assets', () => {
    renderGallery()
    
    expect(screen.getByText('No IP assets registered yet')).toBeInTheDocument()
    expect(screen.getByText('Create your first asset')).toBeInTheDocument()
  })

  it('displays registered IP assets', () => {
    const mockAsset = {
      id: 'test-1',
      title: 'Test Asset',
      description: 'Test description',
      type: 'text' as const,
      content: 'Test content',
      storyAssetId: 'story-123',
      metadata: {
        model: 'gpt-4',
        seed: 123,
        generatedAt: '2025-11-27T00:00:00Z',
        prompt: 'test',
      },
      registeredAt: '2025-11-27T00:00:00Z',
    }

    useStore.setState({ ipAssets: [mockAsset] })
    
    renderGallery()
    
    expect(screen.getByText('Test Asset')).toBeInTheDocument()
    expect(screen.getByText(/story-123/)).toBeInTheDocument()
    expect(screen.getByText('View on Story')).toBeInTheDocument()
  })

  it('displays multiple assets in grid', () => {
    const mockAssets = [
      {
        id: 'test-1',
        title: 'Asset 1',
        description: 'Description 1',
        type: 'text' as const,
        content: 'Content 1',
        storyAssetId: 'story-1',
        metadata: {
          model: 'gpt-4',
          seed: 1,
          generatedAt: '2025-11-27T00:00:00Z',
          prompt: 'test 1',
        },
        registeredAt: '2025-11-27T00:00:00Z',
      },
      {
        id: 'test-2',
        title: 'Asset 2',
        description: 'Description 2',
        type: 'image' as const,
        content: 'Content 2',
        imageUrl: 'https://example.com/image.jpg',
        storyAssetId: 'story-2',
        metadata: {
          model: 'dall-e-3',
          seed: 2,
          generatedAt: '2025-11-27T00:00:00Z',
          prompt: 'test 2',
        },
        registeredAt: '2025-11-27T00:00:00Z',
      },
    ]

    useStore.setState({ ipAssets: mockAssets })
    
    renderGallery()
    
    expect(screen.getByText('Asset 1')).toBeInTheDocument()
    expect(screen.getByText('Asset 2')).toBeInTheDocument()
  })
})
