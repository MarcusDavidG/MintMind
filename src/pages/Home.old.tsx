import Layout from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { Loader2, Image as ImageIcon, Type, Video, CheckCircle2, AlertCircle } from 'lucide-react'
import { generate } from '@/lib/abv'
import { registerIPAsset } from '@/lib/story'
import { useStore } from '@/store/useStore'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [outputType, setOutputType] = useState<'text' | 'image' | 'video'>('text')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [registrationStatus, setRegistrationStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    currentGeneration,
    isGenerating,
    isRegistering,
    autoRegister,
    setCurrentGeneration,
    setIsGenerating,
    setIsRegistering,
    setAutoRegister,
    addIPAsset,
    clearCurrentGeneration,
  } = useStore()

  const handleGenerate = async () => {
    try {
      setError(null)
      setIsGenerating(true)
      setRegistrationStatus('idle')
      
      const result = await generate(prompt, outputType)
      setCurrentGeneration(result)
      
      setTitle(`${outputType.charAt(0).toUpperCase() + outputType.slice(1)} - ${prompt.slice(0, 30)}`)
      setDescription(prompt)
      
      if (autoRegister) {
        await handleRegister(result)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRegister = async (generation = currentGeneration) => {
    if (!generation) return
    
    try {
      setError(null)
      setIsRegistering(true)
      setRegistrationStatus('idle')
      
      const registration = await registerIPAsset({
        title: title || `Generated ${generation.type}`,
        description: description || generation.content.slice(0, 200),
        creator: 'MintMind User',
        contentType: generation.type,
        contentUrl: generation.imageUrl || generation.videoUrl,
        originalPrompt: generation.metadata.prompt,
        model: generation.metadata.model,
        generatedAt: generation.metadata.generatedAt,
        seed: generation.metadata.seed,
      })
      
      if (registration.success) {
        addIPAsset(generation, registration, title, description)
        setRegistrationStatus('success')
        setTimeout(() => {
          clearCurrentGeneration()
          setPrompt('')
          setTitle('')
          setDescription('')
          setRegistrationStatus('idle')
        }, 3000)
      } else {
        throw new Error(registration.error || 'Registration failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
      setRegistrationStatus('error')
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate AI Content</CardTitle>
                <CardDescription>
                  Create text, images, or videos and register them as IP on Story Protocol
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    variant={outputType === 'text' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setOutputType('text')}
                  >
                    <Type className="h-4 w-4 mr-2" />
                    Text
                  </Button>
                  <Button
                    variant={outputType === 'image' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setOutputType('image')}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Image
                  </Button>
                  <Button
                    variant={outputType === 'video' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setOutputType('video')}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Video
                  </Button>
                </div>

                <div>
                  <Input
                    placeholder="Enter your prompt..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Switch
                    checked={autoRegister}
                    onChange={(e) => setAutoRegister(e.target.checked)}
                    label="Auto-register as IP"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleGenerate}
                  disabled={!prompt || isGenerating}
                  className="w-full"
                >
                  {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isGenerating ? 'Generating...' : 'Generate'}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>Your generated content will appear here</CardDescription>
              </CardHeader>
              <CardContent>
                {!currentGeneration && (
                  <div className="flex items-center justify-center h-64 text-muted-foreground">
                    No content generated yet
                  </div>
                )}
                {currentGeneration && (
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-md">
                      {currentGeneration.type === 'text' && (
                        <p className="text-sm whitespace-pre-wrap">{currentGeneration.content}</p>
                      )}
                      {currentGeneration.type === 'image' && currentGeneration.imageUrl && (
                        <img
                          src={currentGeneration.imageUrl}
                          alt="Generated"
                          className="w-full rounded-md"
                        />
                      )}
                      {currentGeneration.type === 'video' && currentGeneration.videoUrl && (
                        <video src={currentGeneration.videoUrl} controls className="w-full rounded-md" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <Input
                        placeholder="Title (optional)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-sm"
                      />
                      <Input
                        placeholder="Description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="text-sm"
                      />
                    </div>

                    {!autoRegister && (
                      <Button
                        onClick={() => handleRegister()}
                        disabled={isRegistering}
                        className="w-full"
                      >
                        {isRegistering && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Register to Story Protocol
                      </Button>
                    )}

                    {(isRegistering || registrationStatus !== 'idle') && (
                      <div className="border-t pt-4">
                        <p className="text-sm font-medium mb-2">IP Registration</p>
                        {isRegistering && (
                          <p className="text-xs text-muted-foreground flex items-center gap-2">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Registering on Story Protocol...
                          </p>
                        )}
                        {registrationStatus === 'success' && (
                          <p className="text-xs text-green-600 flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3" />
                            Successfully registered! Check Gallery.
                          </p>
                        )}
                        {registrationStatus === 'error' && (
                          <p className="text-xs text-red-600 flex items-center gap-2">
                            <AlertCircle className="h-3 w-3" />
                            Registration failed. Try again.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
