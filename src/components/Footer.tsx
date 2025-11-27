export default function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 MintMind. Powered by ABV.dev & Story Protocol
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="https://abv.dev" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              ABV.dev
            </a>
            <a href="https://story.foundation" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              Story Protocol
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
