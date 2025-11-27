import Layout from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'

export default function Settings() {
  const [autoRegister, setAutoRegister] = useState(true)
  const [abvApiKey, setAbvApiKey] = useState('')
  const [storyApiKey, setStoryApiKey] = useState('')

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure your API keys and preferences
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Configure your ABV.dev and Story Protocol API keys
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">ABV.dev API Key</label>
                <Input
                  type="password"
                  placeholder="sk_abv_xxx"
                  value={abvApiKey}
                  onChange={(e) => setAbvApiKey(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Story Protocol API Key</label>
                <Input
                  type="password"
                  placeholder="sk_story_xxx"
                  value={storyApiKey}
                  onChange={(e) => setStoryApiKey(e.target.value)}
                />
              </div>
              <Button className="w-full">Save API Keys</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your generation and registration preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-register IP</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically register generated content to Story Protocol
                  </p>
                </div>
                <Switch
                  checked={autoRegister}
                  onChange={(e) => setAutoRegister(e.target.checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
              <CardDescription>
                Learn more about MintMind
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                MintMind is a web application that allows you to generate AI content using ABV.dev
                and automatically register it as intellectual property on Story Protocol.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://abv.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  ABV.dev Documentation
                </a>
                <a
                  href="https://story.foundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Story Protocol Documentation
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
