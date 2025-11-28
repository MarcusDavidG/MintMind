# MintMind

AI-powered creation studio for generating text, images, and video using ABV.dev — automatically registered as IP on Story Protocol.

## Features

- **AI Generation**: Create text, images, and videos using ABV.dev API
- **Automatic IP Registration**: One-click registration on Story Protocol
- **IP Gallery**: View all your registered IP assets with metadata
- **Auto-Register Toggle**: Enable/disable automatic Story Protocol registration
- **Mock Mode**: Full-featured development mode without API keys

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **UI**: shadcn/ui + TailwindCSS
- **State**: Zustand
- **AI & IP**: ABV.dev + Story Protocol
- **Testing**: Vitest + React Testing Library
- **Deployment**: Vercel

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd MintMind
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   For development with mock data (no API keys needed):
   ```env
   VITE_USE_MOCK=true
   ```
   
   For production with real APIs:
   ```env
   VITE_USE_MOCK=false
   VITE_ABV_API_KEY=your_abv_api_key
   VITE_STORY_API_KEY=your_story_api_key
   ```
   
   **Note**: The live deployment currently runs in mock mode, so you can test all features without API keys!

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173)

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

All tests (10 total):
- 4 store tests (state management)
- 3 Gallery page tests
- 3 Home page tests (generation & registration flows)

## Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Deployment

### Deploy to Vercel

#### Option 1: Using Vercel CLI

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard**
   - Go to your project settings
   - Add environment variables:
     - `VITE_USE_MOCK=true` (or false for production)
     - `VITE_ABV_API_KEY` (if using real API)
     - `VITE_STORY_API_KEY` (if needed)

#### Option 2: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure environment variables
4. Deploy

## Project Structure

```
MintMind/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── pages/
│   │   ├── Home.tsx         # Generator UI
│   │   ├── Gallery.tsx      # IP assets gallery
│   │   └── Settings.tsx
│   ├── lib/
│   │   ├── abv.ts          # ABV.dev API client
│   │   ├── story.ts        # Story Protocol client
│   │   └── utils.ts
│   ├── store/
│   │   └── useStore.ts     # Zustand state management
│   ├── tests/
│   │   ├── Home.test.tsx
│   │   ├── Gallery.test.tsx
│   │   └── store.test.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── dist/                    # Build output
├── .env.example            # Environment template
├── .env.local             # Your local env (git-ignored)
├── vercel.json            # Vercel configuration
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Usage

### Generating Content

1. Navigate to the home page
2. Select content type (Text / Image / Video)
3. Enter your prompt
4. Toggle "Auto-register as IP" if desired
5. Click "Generate"

### Viewing IP Assets

1. Navigate to the "Gallery" page
2. Browse your registered IP assets
3. Click "View on Story" to see asset on Story Protocol

## Development

### Mock Mode

The app includes a full-featured mock mode for development:
- Simulates ABV.dev generation
- Simulates Story Protocol registration
- No API keys required
- Enable with `VITE_USE_MOCK=true`

### Lint

```bash
npm run lint
```

### Type Check

```bash
npm run type-check
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_USE_MOCK` | No | Use mock APIs (true/false) |
| `VITE_ABV_API_KEY` | Production | ABV.dev API key |
| `VITE_STORY_API_KEY` | Production | Story Protocol API key |
| `VITE_COINBASE_CLIENT_ID` | Optional | Coinbase Wallet client ID |
| `VITE_YAKOA_API_KEY` | Optional | Yakoa API key |
| `VITE_APP_URL` | Optional | Deployment URL |

## Demo

**Live Demo**: [https://mintmind-three.vercel.app](https://mintmind-three.vercel.app)

Demo video: [Coming Soon]

## Hackathon Submission

This project demonstrates:
- ABV.dev integration for AI generation
- Story Protocol IP registration
- Clean, responsive UI with shadcn/ui
- Comprehensive test coverage
- Production-ready deployment

## Contributing

Contributions welcome! Please open an issue or PR.

## License

MIT

---

**Built for ABV.dev x Story Protocol Hackathon**
