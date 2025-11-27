import Layout from '@/components/Layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Moon, 
  Sun, 
  Key, 
  Shield, 
  Bell, 
  Palette, 
  Info, 
  ExternalLink,
  Save,
  CheckCircle2,
  Sparkles,
  Github,
  Zap
} from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function Settings() {
  const { theme, toggleTheme, autoRegister, setAutoRegister } = useStore()
  const [abvApiKey, setAbvApiKey] = useState('')
  const [storyApiKey, setStoryApiKey] = useState('')
  const [notifications, setNotifications] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
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

  const settingsSections = [
    {
      title: 'Appearance',
      icon: Palette,
      gradient: 'from-purple-500 to-pink-500',
      settings: [
        {
          label: 'Theme',
          description: 'Switch between light and dark mode',
          icon: theme === 'dark' ? Moon : Sun,
          control: (
            <button
              onClick={toggleTheme}
              className="relative w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded-full transition-colors duration-300"
            >
              <motion.div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full shadow-md flex items-center justify-center ${
                  theme === 'dark' 
                    ? 'bg-slate-800 text-yellow-400' 
                    : 'bg-white text-orange-500'
                }`}
                animate={{
                  x: theme === 'dark' ? 32 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              </motion.div>
            </button>
          ),
        },
      ],
    },
    {
      title: 'API Configuration',
      icon: Key,
      gradient: 'from-blue-500 to-cyan-500',
      settings: [
        {
          label: 'ABV.dev API Key',
          description: 'Your API key for content generation',
          control: (
            <Input
              type="password"
              placeholder="sk_abv_xxx"
              value={abvApiKey}
              onChange={(e) => setAbvApiKey(e.target.value)}
              className="max-w-md"
            />
          ),
        },
        {
          label: 'Story Protocol API Key',
          description: 'Your API key for IP registration',
          control: (
            <Input
              type="password"
              placeholder="sk_story_xxx"
              value={storyApiKey}
              onChange={(e) => setStoryApiKey(e.target.value)}
              className="max-w-md"
            />
          ),
        },
      ],
    },
    {
      title: 'Generation Preferences',
      icon: Zap,
      gradient: 'from-orange-500 to-red-500',
      settings: [
        {
          label: 'Auto-register IP',
          description: 'Automatically register generated content to Story Protocol',
          icon: Shield,
          control: (
            <Switch
              checked={autoRegister}
              onChange={(e) => setAutoRegister(e.target.checked)}
            />
          ),
        },
        {
          label: 'Enable Notifications',
          description: 'Get notified when registration is complete',
          icon: Bell,
          control: (
            <Switch
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          ),
        },
      ],
    },
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Settings
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Customize your MintMind experience
            </p>
          </motion.div>

          {/* Settings Sections */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {settingsSections.map((section, sectionIndex) => {
              const SectionIcon = section.icon
              return (
                <motion.div key={section.title} variants={itemVariants}>
                  <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
                    {/* Section Header */}
                    <div className={`bg-gradient-to-r ${section.gradient} p-6`}>
                      <div className="flex items-center gap-3 text-white">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                          <SectionIcon className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold">{section.title}</h2>
                      </div>
                    </div>

                    {/* Settings Items */}
                    <CardContent className="p-6 space-y-6">
                      {section.settings.map((setting, settingIndex) => {
                        const SettingIcon = 'icon' in setting ? setting.icon : null
                        return (
                          <motion.div
                            key={setting.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: sectionIndex * 0.1 + settingIndex * 0.05 }}
                            className="flex items-center justify-between gap-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl"
                          >
                            <div className="flex items-start gap-4 flex-1">
                              {SettingIcon && (
                                <div className={`p-2 bg-gradient-to-br ${section.gradient} rounded-lg`}>
                                  <SettingIcon className="w-5 h-5 text-white" />
                                </div>
                              )}
                              <div className="flex-1">
                                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-1">
                                  {setting.label}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {setting.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              {setting.control}
                            </div>
                          </motion.div>
                        )
                      })}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}

            {/* Save Button */}
            <motion.div variants={itemVariants}>
              <Button
                onClick={handleSave}
                disabled={saved}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
              >
                {saved ? (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Settings Saved!
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Save Changes
                  </>
                )}
              </Button>
            </motion.div>

            {/* About Section */}
            <motion.div variants={itemVariants}>
              <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-xl">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
                  <div className="flex items-center gap-3 text-white">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Info className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">About MintMind</h2>
                  </div>
                </div>

                <CardContent className="p-6 space-y-6">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    MintMind is a powerful web application that combines AI content generation with 
                    blockchain-based IP protection. Generate stunning text, images, and videos using 
                    ABV.dev, then automatically register them as intellectual property on Story Protocol.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Version', value: 'v1.0.0' },
                      { label: 'Status', value: 'Live' },
                      { label: 'Build', value: 'Production' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{stat.label}</p>
                        <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                      Resources
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        { label: 'ABV.dev Docs', url: 'https://abv.dev', icon: ExternalLink },
                        { label: 'Story Protocol', url: 'https://story.foundation', icon: Shield },
                        { label: 'GitHub Repository', url: 'https://github.com/MarcusDavidG/MintMind', icon: Github },
                        { label: 'Live Demo', url: 'https://mintmind-three.vercel.app', icon: Sparkles },
                      ].map((link) => {
                        const LinkIcon = link.icon
                        return (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
                          >
                            <LinkIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                              {link.label}
                            </span>
                            <ExternalLink className="w-3 h-3 ml-auto text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                          </a>
                        )
                      })}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                      Built with ❤️ for the ABV.dev x Story Protocol Hackathon
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
