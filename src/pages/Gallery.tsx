import Layout from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Image as ImageIcon, Type, Video, ExternalLink } from 'lucide-react'

const mockAssets = [
  {
    id: '1',
    title: 'Sci-Fi Story',
    type: 'text',
    storyAssetId: 'story-asset-123',
    registeredAt: '2025-11-27T10:00:00Z',
    content: 'A brief sci-fi story about...',
  },
  {
    id: '2',
    title: 'Digital Artwork',
    type: 'image',
    storyAssetId: 'story-asset-456',
    registeredAt: '2025-11-26T14:30:00Z',
    content: 'https://placeholder.com/image.jpg',
  },
]

export default function Gallery() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <Type className="h-5 w-5" />
      case 'image':
        return <ImageIcon className="h-5 w-5" />
      case 'video':
        return <Video className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">IP Gallery</h1>
          <p className="text-muted-foreground">
            Your registered IP assets on Story Protocol
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAssets.map((asset) => (
            <Card key={asset.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getIcon(asset.type)}
                    {asset.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Registered: {new Date(asset.registeredAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-muted p-3 rounded-md text-sm">
                    {asset.type === 'image' ? (
                      <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    ) : (
                      <p className="line-clamp-3">{asset.content}</p>
                    )}
                  </div>
                  <div className="text-xs space-y-1">
                    <p className="font-medium">Story Asset ID:</p>
                    <p className="text-muted-foreground font-mono">{asset.storyAssetId}</p>
                  </div>
                  <a
                    href={`https://story.foundation/asset/${asset.storyAssetId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:underline"
                  >
                    View on Story <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockAssets.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No IP assets registered yet</p>
              <a href="/" className="text-primary hover:underline">
                Create your first asset
              </a>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}
