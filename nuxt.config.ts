export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // pages: true,
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:8000'
    }
  }
})