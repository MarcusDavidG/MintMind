import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <Sparkles className="h-6 w-6" />
          MintMind
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Generate
          </Link>
          <Link to="/gallery" className="text-sm font-medium hover:text-primary transition-colors">
            Gallery
          </Link>
          <Link to="/settings" className="text-sm font-medium hover:text-primary transition-colors">
            Settings
          </Link>
          <Button variant="outline" size="sm">
            Connect Wallet
          </Button>
        </nav>
      </div>
    </header>
  )
}
