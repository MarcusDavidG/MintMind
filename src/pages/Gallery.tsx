import Layout from '@/components/Layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Image as ImageIcon, Type, Video, ExternalLink, Sparkles, Grid3x3, List, Calendar, Hash } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Gallery() {
  const { ipAssets } = useStore()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const getIcon = (type: string) => {
    switch (type) {
      case 'text':
        return Type
      case 'image':
        return ImageIcon
      case 'video':
        return Video
      default:
        return Sparkles
    }
  }

  const getGradient = (type: string) => {
    switch (type) {
      case 'text':
        return 'from-blue-500 to-cyan-500'
      case 'image':
        return 'from-purple-500 to-pink-500'
      case 'video':
        return 'from-orange-500 to-red-500'
      default:
        return 'from-slate-500 to-slate-700'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                  IP Gallery
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Your registered intellectual property on Story Protocol
                </p>
              </div>

              {/* View Mode Toggle */}
              {ipAssets.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex gap-2 bg-white dark:bg-slate-800 p-1 rounded-lg border-2 border-slate-200 dark:border-slate-700"
                >
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                      viewMode === 'grid'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                      viewMode === 'list'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <List className="w-4 h-4" />
                    List
                  </button>
                </motion.div>
              )}
            </div>

            {/* Stats Bar */}
            {ipAssets.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {[
                  { label: 'Total Assets', value: ipAssets.length, icon: Sparkles },
                  { label: 'Text', value: ipAssets.filter(a => a.type === 'text').length, icon: Type },
                  { label: 'Images', value: ipAssets.filter(a => a.type === 'image').length, icon: ImageIcon },
                  { label: 'Videos', value: ipAssets.filter(a => a.type === 'video').length, icon: Video },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                          {stat.value}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {stat.label}
                        </p>
                      </div>
                      <stat.icon className="w-8 h-8 text-purple-500" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Gallery Grid/List */}
          <AnimatePresence mode="wait">
            {ipAssets.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="border-2 border-dashed border-slate-300 dark:border-slate-600">
                  <CardContent className="flex flex-col items-center justify-center py-20">
                    <div className="p-8 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-6">
                      <Sparkles className="w-16 h-16 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                      No IP assets yet
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 text-center max-w-md">
                      Start creating and registering your AI-generated content to build your IP portfolio
                    </p>
                    <Link to="/generate">
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                        Create your first asset
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key={viewMode}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
              >
                {ipAssets.map((asset) => {
                  const Icon = getIcon(asset.type)
                  const gradient = getGradient(asset.type)

                  return (
                    <motion.div
                      key={asset.id}
                      variants={itemVariants}
                      layout
                      whileHover={{ y: -5 }}
                    >
                      <Card className="group border-2 border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all shadow-lg hover:shadow-xl overflow-hidden h-full">
                        <CardContent className="p-0">
                          {/* Content Preview */}
                          <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
                            {asset.type === 'image' && asset.imageUrl ? (
                              <img
                                src={asset.imageUrl}
                                alt={asset.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : asset.type === 'video' && asset.videoUrl ? (
                              <div className="relative w-full h-full">
                                <video
                                  src={asset.videoUrl}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                  <Video className="w-12 h-12 text-white" />
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <div className="text-center p-6">
                                  <Icon className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                                    {asset.content}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Type Badge */}
                            <div className="absolute top-3 right-3">
                              <div className={`px-3 py-1 bg-gradient-to-r ${gradient} rounded-full flex items-center gap-1.5`}>
                                <Icon className="w-3.5 h-3.5 text-white" />
                                <span className="text-xs font-medium text-white capitalize">
                                  {asset.type}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Asset Details */}
                          <div className="p-6 space-y-4">
                            <div>
                              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1 line-clamp-1">
                                {asset.title}
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                                {asset.description}
                              </p>
                            </div>

                            {/* Metadata */}
                            <div className="space-y-2 text-xs">
                              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                <Hash className="w-3.5 h-3.5" />
                                <span className="font-mono truncate">{asset.storyAssetId}</span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{new Date(asset.registeredAt).toLocaleDateString()}</span>
                              </div>
                            </div>

                            {/* View on Story Button */}
                            <a
                              href={`https://story.foundation/asset/${asset.storyAssetId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                            >
                              <Button
                                variant="outline"
                                className="w-full border-2 border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                              >
                                View on Story
                                <ExternalLink className="ml-2 h-3.5 w-3.5" />
                              </Button>
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  )
}
