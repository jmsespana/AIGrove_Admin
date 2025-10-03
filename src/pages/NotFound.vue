<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="text-center">
      <!-- 404 Illustration -->
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-gray-300">404</h1>
      </div>
      
      <!-- Error Message -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h2>
        <p class="text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4 justify-center">
        <button 
          @click="goBack"
          class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
        >
          Go Back
        </button>
        <router-link 
          to="/"
          class="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all"
        >
          Go to Dashboard
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.go(-1)
}
</script>
