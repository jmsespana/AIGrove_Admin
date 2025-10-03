<template>
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar v-if="showSidebar" />
    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from './supabase/client'

const route = useRoute()
const router = useRouter()

// Hide sidebar on login page
const showSidebar = computed(() => route.path !== '/login')

// Listen to auth state changes
onMounted(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
      // User signed out, redirect to login
      router.push('/login')
    } else if (event === 'SIGNED_IN') {
      // User signed in, redirect to dashboard if on login page
      if (route.path === '/login') {
        router.push('/')
      }
    }
  })
})
</script>