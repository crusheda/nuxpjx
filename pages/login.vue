<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700">
    <transition name="fade-scale">
      <div
        v-if="show"
        class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden"
      >
        <h2 class="text-3xl font-bold mb-6 text-gray-800 text-center">Login ke Sakudewa</h2>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div class="relative">
            <input
              v-model="email"
              type="email"
              id="email"
              required
              placeholder=" "
              class="peer w-full border-b-2 border-gray-300 focus:border-indigo-600 outline-none py-2 bg-transparent"
            />
            <label
              for="email"
              class="absolute left-0 top-2 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-indigo-600"
            >Email</label>
          </div>

          <!-- Password -->
          <div class="relative">
            <input
              v-model="password"
              type="password"
              id="password"
              required
              placeholder=" "
              class="peer w-full border-b-2 border-gray-300 focus:border-indigo-600 outline-none py-2 bg-transparent"
            />
            <label
              for="password"
              class="absolute left-0 top-2 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-indigo-600"
            >Password</label>
          </div>

          <!-- Error -->
          <div v-if="errorMessage" class="text-red-500 text-sm">
            {{ errorMessage }}
          </div>

          <!-- Button -->
          <button
            type="submit"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition transform hover:scale-105"
          >
            Masuk
          </button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from '#app'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const show = ref(false)
const router = useRouter()

onMounted(() => {
  show.value = true
})

const handleLogin = async () => {
  errorMessage.value = ''

  try {
    await $fetch('http://localhost:8000/sanctum/csrf-cookie', {
      credentials: 'include'
    })

    const response = await $fetch('http://localhost:8000/api/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      },
      credentials: 'include'
    })

    console.log('Login success:', response)

    // Redirect ke dashboard kalau berhasil
    router.push('/dashboard')
  } catch (error: any) {
    console.error('Login error:', error)
    errorMessage.value = error?.data?.message || 'Login gagal'
  }
}
</script>

<style scoped>
.fade-scale-enter-active {
  transition: all 0.5s ease;
}
.fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.fade-scale-enter-to {
  opacity: 1;
  transform: scale(1);
}
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
