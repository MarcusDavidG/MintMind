import Layout from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Image as ImageIcon, Type, Video, ExternalLink } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { Link } from 'react-router-dom'

export default function Gallery() {
  const { ipAssets } = useStore()
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
          {ipAssets.map((asset) => (
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
                    {asset.type === 'image' && asset.imageUrl ? (
                      <img
                        src={asset.imageUrl}
                        alt={asset.title}
                        className="w-full rounded-md"
                      />
                    ) : asset.type === 'video' && asset.videoUrl ? (
                      <video
                        src={asset.videoUrl}
                        controls
                        className="w-full rounded-md"
                      />
                    ) : (
                      <p className="line-clamp-3 whitespace-pre-wrap">{asset.content}</p>
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

        {ipAssets.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No IP assets registered yet</p>
              <Link to="/" className="text-primary hover:underline">
                Create your first asset
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}
