<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
      <p class="text-gray-600">Overview of your AIGrove platform</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Users Card -->
      <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="bg-blue-100 p-3 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <div>
              <div class="text-sm text-gray-500 font-medium">Total Users</div>
              <div class="text-3xl font-bold text-gray-800">{{ userCount }}</div>
            </div>
          </div>
        </div>
        <div class="flex items-center text-sm">
          <span class="text-green-600 font-semibold flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"></path>
            </svg>
            +{{ newUsersToday }}
          </span>
          <span class="text-gray-500 ml-2">new today</span>
        </div>
      </div>

      <!-- Species Scanned Card -->
      <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="bg-green-100 p-3 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <div>
              <div class="text-sm text-gray-500 font-medium">Mangroves Scanned</div>
              <div class="text-3xl font-bold text-gray-800">{{ speciesCount }}</div>
            </div>
          </div>
        </div>
        <div class="flex items-center text-sm">
          <span class="text-green-600 font-semibold flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"></path>
            </svg>
            +{{ newScansToday }}
          </span>
          <span class="text-gray-500 ml-2">scans today</span>
        </div>
      </div>

      <!-- Quiz Activity Card -->
      <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="bg-purple-100 p-3 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <div class="text-sm text-gray-500 font-medium">Quiz Attempts</div>
              <div class="text-3xl font-bold text-gray-800">{{ quizCount }}</div>
            </div>
          </div>
        </div>
        <div class="flex items-center text-sm">
          <span class="text-green-600 font-semibold flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"></path>
            </svg>
            +{{ newQuizzesToday }}
          </span>
          <span class="text-gray-500 ml-2">taken today</span>
        </div>
      </div>
    </div>

    <!-- Recent Activity Section -->
    <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-800">Recent Activity</h2>
        <button @click="refreshActivity" class="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Refresh
        </button>
      </div>

      <!-- Activity List -->
      <div v-if="activities.length > 0" class="space-y-4">
        <div 
          v-for="activity in activities" 
          :key="activity.id" 
          class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <!-- Icon based on activity type -->
          <div 
            class="p-2 rounded-full flex-shrink-0"
            :class="{
              'bg-blue-100': activity.type === 'user_signup',
              'bg-green-100': activity.type === 'species_scan',
              'bg-purple-100': activity.type === 'quiz_taken'
            }"
          >
            <svg 
              class="w-5 h-5" 
              :class="{
                'text-blue-600': activity.type === 'user_signup',
                'text-green-600': activity.type === 'species_scan',
                'text-purple-600': activity.type === 'quiz_taken'
              }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                v-if="activity.type === 'user_signup'"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
              <path 
                v-else-if="activity.type === 'species_scan'"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
              <path 
                v-else
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          
          <!-- Activity Details -->
          <div class="flex-1">
            <p class="text-gray-800 font-medium">{{ translateDescription(activity.description) }}</p>
            <p class="text-sm text-gray-500 mt-1">{{ activity.user_email }}</p>
          </div>
          
          <!-- Timestamp -->
          <div class="text-sm text-gray-400">
            {{ formatTime(activity.created_at) }}
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
        <p class="text-gray-500 font-medium">No recent activity</p>
        <p class="text-sm text-gray-400 mt-2">Activities will appear here in real-time as users interact with the app</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from '../supabase/client'

const userCount = ref(0)
const speciesCount = ref(0)
const quizCount = ref(0)
const newUsersToday = ref(0)
const newScansToday = ref(0)
const newQuizzesToday = ref(0)
const activities = ref([])

let realtimeChannel = null

onMounted(async () => {
  await loadDashboardData()
  setupRealtimeSubscriptions()
})

onUnmounted(() => {
  // Cleanup subscriptions
  if (realtimeChannel) {
    console.log('Unsubscribing from realtime channel...')
    realtimeChannel.unsubscribe()
  }
})

async function loadDashboardData() {
  // Get total counts
  const { count: users, error: usersError } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
  if (usersError) console.error('Error loading users:', usersError)
  userCount.value = users || 0

  const { count: scans, error: scansError } = await supabase.from('scans').select('*', { count: 'exact', head: true })
  if (scansError) console.error('Error loading scans:', scansError)
  speciesCount.value = scans || 0

  const { count: quizzes, error: quizzesError } = await supabase.from('quiz_history').select('*', { count: 'exact', head: true })
  if (quizzesError) console.error('Error loading quiz attempts:', quizzesError)
  quizCount.value = quizzes || 0

  // For "today" counts, set to 0 if tables don't have created_at column
  // You can enable these later if your tables have timestamp columns
  newUsersToday.value = 0
  newScansToday.value = 0
  newQuizzesToday.value = 0

  // Load recent activities
  await loadActivities()
}

async function loadActivities() {
  const { data: activityData, error } = await supabase
    .from('user_activity')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) {
    console.error('❌ Error loading activities:', error)
    // Set empty array if there's an error
    activities.value = []
  } else {
    console.log('📋 Loaded activities:', activityData)
    activities.value = activityData || []
  }
}

function setupRealtimeSubscriptions() {
  console.log('Setting up realtime subscriptions...')
  
  // Use a single channel for all subscriptions
  realtimeChannel = supabase
    .channel('dashboard-realtime-' + Date.now()) // Unique channel name
    .on('postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'profiles' },
      (payload) => {
        console.log('✅ New user registered:', payload)
        userCount.value++
        newUsersToday.value++
        // Add activity
        activities.value.unshift({
          id: Date.now(),
          type: 'user_signup',
          description: 'New user registered',
          user_email: payload.new.email || 'Unknown',
          created_at: new Date().toISOString()
        })
        // Keep only last 10 activities
        if (activities.value.length > 10) activities.value.pop()
      }
    )
    .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'scans' },
      async (payload) => {
        console.log('✅ New scan detected:', payload)
        speciesCount.value++
        newScansToday.value++
        
        // Get user email
        const { data: userData } = await supabase
          .from('profiles')
          .select('email')
          .eq('id', payload.new.user_id)
          .single()

        activities.value.unshift({
          id: Date.now(),
          type: 'species_scan',
          description: `Scanned mangrove species: ${payload.new.species_name || 'Unknown'}`,
          user_email: userData?.email || 'Unknown',
          created_at: new Date().toISOString()
        })
        if (activities.value.length > 10) activities.value.pop()
      }
    )
    .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'quiz_history' },
      async (payload) => {
        console.log('✅ New quiz attempt detected:', payload)
        quizCount.value++
        newQuizzesToday.value++

        // Get user email
        const { data: userData } = await supabase
          .from('profiles')
          .select('email')
          .eq('id', payload.new.user_id)
          .single()

        activities.value.unshift({
          id: Date.now(),
          type: 'quiz_taken',
          description: `Completed ${payload.new.category_name || 'quiz'} with score: ${payload.new.score || 0}/${payload.new.total_questions || 0}`,
          user_email: userData?.email || 'Unknown',
          created_at: new Date().toISOString()
        })
        if (activities.value.length > 10) activities.value.pop()
      }
    )
    .subscribe((status, err) => {
      console.log('📡 Realtime channel status:', status)
      if (err) console.error('❌ Realtime error:', err)
      if (status === 'SUBSCRIBED') {
        console.log('🎉 Successfully subscribed to all realtime events!')
      }
      if (status === 'CLOSED') {
        console.warn('⚠️ Realtime channel closed!')
      }
    })
}

async function refreshActivity() {
  console.log('🔄 Refreshing dashboard data...')
  await loadDashboardData()
  console.log('✅ Dashboard data refreshed!')
}

// Test function to manually insert and see if realtime works
async function testRealtimeQuiz() {
  console.log('🧪 Testing quiz count...')
  const { count, error } = await supabase
    .from('user_quiz_attempts')
    .select('*', { count: 'exact', head: true })
  
  if (error) {
    console.error('❌ Error:', error)
  } else {
    console.log('📊 Total quiz attempts in database:', count)
    console.log('📊 Current count in UI:', quizCount.value)
  }
}

function translateDescription(description) {
  // Translate Tagalog/Cebuano to English
  const translations = {
    'Natapos ang isang challenge': 'Completed a challenge',
    'Nakakuha og': 'Earned',
    'points gikan sa quiz': 'points from quiz',
    'gikan sa quiz': 'from quiz'
  }
  
  let translated = description
  for (const [tagalog, english] of Object.entries(translations)) {
    translated = translated.replace(tagalog, english)
  }
  
  return translated
}

function formatTime(timestamp) {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return date.toLocaleDateString()
}
</script>