<template>
  <aside class="fixed left-0 top-0 h-screen bg-gradient-to-b from-green-800 to-green-900 text-white w-72 p-6 flex flex-col shadow-2xl overflow-y-auto z-50">
    <!-- Admin Profile Section -->
    <div class="mb-8 pb-6 border-b border-green-700">
      <div class="flex items-center gap-4 mb-3">
        <!-- Admin Avatar -->
        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {{ getInitials(adminName) }}
        </div>
        <div class="flex-1">
          <div class="text-sm text-green-300 font-medium">Welcome back,</div>
          <div class="text-lg font-bold truncate">{{ adminName }}</div>
        </div>
      </div>
      <div class="text-xs text-green-300 bg-green-900 bg-opacity-50 px-3 py-1.5 rounded-full inline-block">
        <span class="flex items-center gap-1.5">
          <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          {{ adminEmail }}
        </span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex flex-col gap-2 flex-1">
      <router-link
        to="/"
        class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group font-medium"
        :class="$route.path === '/' 
          ? 'bg-green-700 shadow-lg text-white border-l-4 border-green-300' 
          : 'hover:bg-green-700 hover:bg-opacity-50 text-green-50'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        <span>Dashboard</span>
      </router-link>

      <router-link
        to="/users"
        class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group font-medium"
        :class="$route.path.startsWith('/users') 
          ? 'bg-green-700 shadow-lg text-white border-l-4 border-green-300' 
          : 'hover:bg-green-700 hover:bg-opacity-50 text-green-50'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
        <span>Users</span>
      </router-link>

      <router-link
        to="/species"
        class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group font-medium"
        :class="$route.path.startsWith('/species') 
          ? 'bg-green-700 shadow-lg text-white border-l-4 border-green-300' 
          : 'hover:bg-green-700 hover:bg-opacity-50 text-green-50'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <span>Species</span>
      </router-link>
    </nav>

    <!-- Logout Button -->
    <div class="mt-6 pt-6 border-t border-green-700">
      <button
        @click="logout"
        class="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
        </svg>
        Logout
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase/client'

const router = useRouter()
const adminName = ref('Admin')
const adminEmail = ref('Loading...')

onMounted(async () => {
  // Get current logged-in admin details
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    adminEmail.value = user.email || 'admin@aigrove.com'
    
    // Try to get name from user metadata
    if (user.user_metadata?.full_name) {
      adminName.value = user.user_metadata.full_name
    } else if (user.user_metadata?.name) {
      adminName.value = user.user_metadata.name
    } else {
      // Extract name from email (before @)
      const emailName = user.email?.split('@')[0] || 'Admin'
      adminName.value = emailName
        .split('.')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
    }
  }
})

function getInitials(name) {
  if (!name) return 'A'
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

async function logout() {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>