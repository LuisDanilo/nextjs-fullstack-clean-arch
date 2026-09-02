import type es from '@/messages/es.json'

declare global {
  interface AppConfig {
    Messages: typeof es
  }
}

export {}
