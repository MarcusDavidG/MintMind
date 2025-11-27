import Layout from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { Loader2, Image as ImageIcon, Type, Video } from 'lucide-react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [outputType, setOutputType] = useState<'text' | 'image' | 'video'>('text')
  const [autoRegister, setAutoRegister] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setResult({
        type: outputType,
        content: 'Generated content will appear here...',
        timestamp: new Date().toISOString(),
      })
      setIsGenerating(false)
    }, 2000)
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
                {!result && (
                  <div className="flex items-center justify-center h-64 text-muted-foreground">
                    No content generated yet
                  </div>
                )}
                {result && (
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-sm">{result.content}</p>
                    </div>
                    {autoRegister && (
                      <div className="border-t pt-4">
                        <p className="text-sm font-medium mb-2">IP Registration</p>
                        <p className="text-xs text-muted-foreground">
                          This content will be registered on Story Protocol
                        </p>
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
