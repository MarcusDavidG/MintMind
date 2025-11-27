import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import * as abvLib from '../lib/abv'
import * as storyLib from '../lib/story'

vi.mock('../lib/abv')
vi.mock('../lib/story')

const renderHome = () => {
  return render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )
}

describe('Home Page', () => {
  it('renders the generation form', () => {
    renderHome()
    
    expect(screen.getByPlaceholderText('Enter your prompt...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Generate/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Text/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Image/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Video/i })).toBeInTheDocument()
  })

  it('can generate text content', async () => {
    const mockResult = {
      type: 'text' as const,
      content: 'Generated test content',
      metadata: {
        model: 'gpt-4',
        seed: 12345,
        generatedAt: new Date().toISOString(),
        prompt: 'test prompt',
      },
    }

    vi.mocked(abvLib.generate).mockResolvedValue(mockResult)
    vi.mocked(storyLib.registerIPAsset).mockResolvedValue({
      success: true,
      assetId: 'test-asset-123',
      txHash: '0xabc123',
    })

    renderHome()
    
    const promptInput = screen.getByPlaceholderText('Enter your prompt...')
    const generateButton = screen.getByRole('button', { name: /Generate/i })

    fireEvent.change(promptInput, { target: { value: 'test prompt' } })
    fireEvent.click(generateButton)

    await waitFor(() => {
      expect(screen.getByText('Generated test content')).toBeInTheDocument()
    })
  })

  it('shows error when generation fails', async () => {
    vi.mocked(abvLib.generate).mockRejectedValue(new Error('Generation failed'))

    renderHome()
    
    const promptInput = screen.getByPlaceholderText('Enter your prompt...')
    const generateButton = screen.getByRole('button', { name: /Generate/i })

    fireEvent.change(promptInput, { target: { value: 'test prompt' } })
    fireEvent.click(generateButton)

    await waitFor(() => {
      expect(screen.getByText('Generation failed')).toBeInTheDocument()
    })
  })
})
