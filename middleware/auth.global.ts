export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, fetchUser } = useAuth()

  if (!user.value) {
    await fetchUser()
  }

  if (!user.value && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (user.value && to.path === '/login') {
    return navigateTo('/')
  }
})
