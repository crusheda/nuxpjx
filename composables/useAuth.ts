export const useAuth = () => {
  const user = useState<any>('user', () => null)
  const config = useRuntimeConfig()

  const login = async (email: string, password: string) => {
    // Step 1: CSRF cookie
    await $fetch(`${config.public.apiBase}/sanctum/csrf-cookie`, {
      credentials: 'include'
    })

    // Step 2: POST login
    await $fetch(`${config.public.apiBase}/login`, {
      method: 'POST',
      body: { email, password },
      credentials: 'include'
    })

    // Step 3: Fetch profile
    const profile = await $fetch(`${config.public.apiBase}/api/user`, {
      credentials: 'include'
    })
    user.value = profile
  }

  const fetchUser = async () => {
    try {
      const profile = await $fetch(`${config.public.apiBase}/api/user`, {
        credentials: 'include'
      })
      user.value = profile
    } catch {
      user.value = null
    }
  }

  const logout = async () => {
    await $fetch(`${config.public.apiBase}/logout`, {
      method: 'POST',
      credentials: 'include'
    })
    user.value = null
  }

  return { user, login, fetchUser, logout }
}
