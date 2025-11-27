/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ABV_API_KEY: string
  readonly VITE_STORY_API_KEY: string
  readonly VITE_COINBASE_CLIENT_ID: string
  readonly VITE_YAKOA_API_KEY: string
  readonly VITE_APP_URL: string
  readonly VITE_USE_MOCK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
