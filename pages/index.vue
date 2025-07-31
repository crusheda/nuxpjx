<template>
  <div class="p-8">
    <h1 class="text-2xl">Hello, {{ user?.name }}</h1>
    <button @click="logout" class="mt-4 bg-red-600 text-white p-2 rounded">
      Logout
    </button>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()
</script>
