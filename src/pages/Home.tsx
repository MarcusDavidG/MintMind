import Layout from '@/components/Layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Image as ImageIcon, Type, Video, CheckCircle2, AlertCircle, Sparkles, Shield, Wand2 } from 'lucide-react'
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

  const contentTypes = [
    { type: 'text' as const, icon: Type, label: 'Text', color: 'from-blue-500 to-cyan-500' },
    { type: 'image' as const, icon: ImageIcon, label: 'Image', color: 'from-purple-500 to-pink-500' },
    { type: 'video' as const, icon: Video, label: 'Video', color: 'from-orange-500 to-red-500' },
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Create AI Content
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Generate stunning content and automatically register it as IP on Story Protocol
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Generator Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-xl">
                <CardContent className="p-8 space-y-6">
                  {/* Content Type Selection */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 block">
                      Select Content Type
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {contentTypes.map((item) => (
                        <motion.button
                          key={item.type}
                          onClick={() => setOutputType(item.type)}
                          className={`relative p-4 rounded-xl border-2 transition-all ${
                            outputType === item.type
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                              : 'border-slate-200 dark:border-slate-700 hover:border-purple-300'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <div className={`p-3 rounded-lg bg-gradient-to-br ${item.color}`}>
                              <item.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              {item.label}
                            </span>
                          </div>
                          {outputType === item.type && (
                            <motion.div
                              layoutId="activeType"
                              className="absolute inset-0 border-2 border-purple-500 rounded-xl"
                              initial={false}
                              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Prompt Input */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                      Your Prompt
                    </label>
                    <div className="relative">
                      <textarea
                        placeholder="Describe what you want to create..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full min-h-[120px] p-4 pr-12 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 transition-all resize-none bg-white dark:bg-slate-800"
                      />
                      <Wand2 className="absolute right-4 top-4 w-5 h-5 text-purple-400" />
                    </div>
                  </div>

                  {/* Auto-register Toggle */}
                  <motion.div
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Auto-register as IP
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Protect your creation automatically
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={autoRegister}
                      onChange={(e) => setAutoRegister(e.target.checked)}
                    />
                  </motion.div>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800"
                      >
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Generate Button */}
                  <Button
                    onClick={handleGenerate}
                    disabled={!prompt || isGenerating}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate Content
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Preview Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-xl h-full">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                    Preview
                  </h3>
                  
                  <AnimatePresence mode="wait">
                    {!currentGeneration ? (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl"
                      >
                        <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-4">
                          <Sparkles className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-center">
                          Your generated content will appear here
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="space-y-4"
                      >
                        {/* Content Display */}
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                          {currentGeneration.type === 'text' && (
                            <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                              {currentGeneration.content}
                            </p>
                          )}
                          {currentGeneration.type === 'image' && currentGeneration.imageUrl && (
                            <motion.img
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              src={currentGeneration.imageUrl}
                              alt="Generated"
                              className="w-full rounded-lg shadow-lg"
                            />
                          )}
                          {currentGeneration.type === 'video' && currentGeneration.videoUrl && (
                            <video
                              src={currentGeneration.videoUrl}
                              controls
                              className="w-full rounded-lg shadow-lg"
                            />
                          )}
                        </div>

                        {/* Metadata Inputs */}
                        <div className="space-y-3">
                          <Input
                            placeholder="Title (optional)"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500"
                          />
                          <Input
                            placeholder="Description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500"
                          />
                        </div>

                        {/* Manual Register Button */}
                        {!autoRegister && (
                          <Button
                            onClick={() => handleRegister()}
                            disabled={isRegistering}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                          >
                            {isRegistering ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Registering...
                              </>
                            ) : (
                              <>
                                <Shield className="mr-2 h-4 w-4" />
                                Register to Story Protocol
                              </>
                            )}
                          </Button>
                        )}

                        {/* Registration Status */}
                        <AnimatePresence>
                          {(isRegistering || registrationStatus !== 'idle') && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="border-t border-slate-200 dark:border-slate-700 pt-4"
                            >
                              <p className="text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                                IP Registration
                              </p>
                              {isRegistering && (
                                <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                  Registering on Story Protocol...
                                </p>
                              )}
                              {registrationStatus === 'success' && (
                                <motion.p
                                  initial={{ scale: 0.8 }}
                                  animate={{ scale: 1 }}
                                  className="text-xs text-green-600 dark:text-green-400 flex items-center gap-2"
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                  Successfully registered! Check Gallery.
                                </motion.p>
                              )}
                              {registrationStatus === 'error' && (
                                <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                                  <AlertCircle className="h-3 w-3" />
                                  Registration failed. Try again.
                                </p>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
