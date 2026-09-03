import type es from '@/i18n/messages/es.json'

declare global {
  interface AppConfig {
    Messages: typeof es
  }
}

export {}
