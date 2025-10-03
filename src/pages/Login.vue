<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
    <!-- Logo/Brand Section -->
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-gray-800">AIGrove Admin</h1>
      <p class="mt-2 text-sm text-gray-600">Welcome back! Please login to continue</p>
    </div>

    <!-- Login Form -->
    <form @submit.prevent="login" class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
      <h2 class="mb-6 text-2xl font-bold text-gray-800">Sign In</h2>
      
      <!-- Email Input -->
      <div class="mb-4">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
            </svg>
          </div>
          <input 
            id="email"
            v-model="email" 
            type="email" 
            placeholder="admin@aigrove.com" 
            required
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
          />
        </div>
      </div>

      <!-- Password Input -->
      <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="••••••••" 
            required
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
          />
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
        <svg class="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
        </svg>
        <span class="text-sm text-red-800">{{ error }}</span>
      </div>

      <!-- Login Button -->
      <button 
        type="submit"
        :disabled="loading"
        class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <span v-if="!loading">Sign In</span>
        <span v-else class="flex items-center justify-center gap-2">
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Signing in...
        </span>
      </button>
    </form>

    <!-- Footer -->
    <div class="mt-8 text-center text-sm text-gray-500">
      <p>&copy; 2025 AIGrove. All rights reserved.</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase/client'
import { useRouter, useRoute } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()
const route = useRoute()

async function login() {
  error.value = ''
  loading.value = true
  
  try {
    const { error: err } = await supabase.auth.signInWithPassword({ 
      email: email.value, 
      password: password.value 
    })
    
    if (err) {
      error.value = err.message
    } else {
      // Redirect to the intended page or dashboard
      const redirectTo = route.query.redirect || '/'
      router.push(redirectTo)
    }
  } catch (err) {
    error.value = 'An unexpected error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>