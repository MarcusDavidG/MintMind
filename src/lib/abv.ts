export interface GenerationOptions {
  model?: string
  seed?: number
  temperature?: number
}

export interface GenerationResult {
  type: 'text' | 'image' | 'video'
  content: string
  imageUrl?: string
  videoUrl?: string
  metadata: {
    model: string
    seed: number
    generatedAt: string
    prompt: string
  }
}

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const API_KEY = import.meta.env.VITE_ABV_API_KEY

const MOCK_IMAGES = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800',
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function mockGenerate(
  prompt: string,
  type: 'text' | 'image' | 'video',
  options: GenerationOptions = {}
): Promise<GenerationResult> {
  await delay(1500 + Math.random() * 1000)

  const seed = options.seed || Math.floor(Math.random() * 1000000)

  if (type === 'text') {
    const sampleTexts = [
      `A brief story based on "${prompt}": In a world where technology and nature coexist, a lone explorer discovers an ancient secret that could change everything. The journey begins at dawn, with nothing but hope and determination guiding the way.`,
      `Regarding "${prompt}": Once upon a time, in a digital realm far from our own, there existed a place where ideas took physical form. Every thought, every dream, became tangible. This is the story of how one person learned to navigate this extraordinary landscape.`,
      `Inspired by "${prompt}": The future is not written in stone, but in the choices we make today. As the sun sets on one era, another begins to rise. What will we create? What legacy will we leave? These questions echo through time.`,
    ]
    return {
      type: 'text',
      content: sampleTexts[Math.floor(Math.random() * sampleTexts.length)],
      metadata: {
        model: options.model || 'gpt-4-turbo',
        seed,
        generatedAt: new Date().toISOString(),
        prompt,
      },
    }
  }

  if (type === 'image') {
    const randomImage = MOCK_IMAGES[Math.floor(Math.random() * MOCK_IMAGES.length)]
    return {
      type: 'image',
      content: `Image generated: ${prompt}`,
      imageUrl: randomImage,
      metadata: {
        model: options.model || 'dall-e-3',
        seed,
        generatedAt: new Date().toISOString(),
        prompt,
      },
    }
  }

  if (type === 'video') {
    return {
      type: 'video',
      content: `Video generated: ${prompt}`,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      metadata: {
        model: options.model || 'sora-v1',
        seed,
        generatedAt: new Date().toISOString(),
        prompt,
      },
    }
  }

  throw new Error(`Unsupported generation type: ${type}`)
}

export async function generateText(
  prompt: string,
  options: GenerationOptions = {}
): Promise<GenerationResult> {
  if (USE_MOCK || !API_KEY) {
    return mockGenerate(prompt, 'text', options)
  }

  throw new Error('ABV.dev API integration not yet implemented. Set VITE_USE_MOCK=true in .env')
}

export async function generateImage(
  prompt: string,
  options: GenerationOptions = {}
): Promise<GenerationResult> {
  if (USE_MOCK || !API_KEY) {
    return mockGenerate(prompt, 'image', options)
  }

  throw new Error('ABV.dev API integration not yet implemented. Set VITE_USE_MOCK=true in .env')
}

export async function generateVideo(
  prompt: string,
  options: GenerationOptions = {}
): Promise<GenerationResult> {
  if (USE_MOCK || !API_KEY) {
    return mockGenerate(prompt, 'video', options)
  }

  throw new Error('ABV.dev API integration not yet implemented. Set VITE_USE_MOCK=true in .env')
}

export async function generate(
  prompt: string,
  type: 'text' | 'image' | 'video',
  options: GenerationOptions = {}
): Promise<GenerationResult> {
  switch (type) {
    case 'text':
      return generateText(prompt, options)
    case 'image':
      return generateImage(prompt, options)
    case 'video':
      return generateVideo(prompt, options)
    default:
      throw new Error(`Unknown generation type: ${type}`)
  }
}
