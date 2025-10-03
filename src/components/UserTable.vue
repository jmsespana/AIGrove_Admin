<template>
  <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
    <!-- Header with Search and Filter -->
    <div class="p-6 border-b border-gray-200">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 class="text-xl font-bold text-gray-800">User Management</h2>
          <p class="text-sm text-gray-500 mt-1">Total: {{ users.length }} users</p>
        </div>
        
        <!-- Search Bar -->
        <div class="relative w-full md:w-64">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
          <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50 transition-colors">
            <!-- User Info with Avatar -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <div class="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                    {{ getInitials(user.full_name || user.email) }}
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ user.email }}</div>
                  <div class="text-sm text-gray-500">{{ user.phone || 'No phone' }}</div>
                </div>
              </div>
            </td>

            <!-- Full Name -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ user.full_name || 'N/A' }}</div>
            </td>

            <!-- Role -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-purple-100 text-purple-800': user.role === 'admin',
                  'bg-blue-100 text-blue-800': user.role === 'moderator',
                  'bg-gray-100 text-gray-800': user.role === 'user' || !user.role
                }"
              >
                {{ user.role || 'user' }}
              </span>
            </td>

            <!-- Status -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': !user.is_blocked,
                  'bg-red-100 text-red-800': user.is_blocked
                }"
              >
                {{ user.is_blocked ? 'blocked' : 'active' }}
              </span>
            </td>

            <!-- Joined Date -->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(user.created_at) }}
            </td>

            <!-- Actions -->
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="flex items-center gap-2">
                <button 
                  @click="viewUser(user)"
                  class="text-blue-600 hover:text-blue-900 transition-colors"
                  title="View Details"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </button>
                <button 
                  v-if="user.role !== 'admin'"
                  @click="toggleRole(user)"
                  class="text-green-600 hover:text-green-900 transition-colors"
                  title="Change Role"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </button>
                <button 
                  @click="toggleBlock(user)"
                  :class="user.is_blocked ? 'text-green-600 hover:text-green-900' : 'text-red-600 hover:text-red-900'"
                  class="transition-colors"
                  :title="user.is_blocked ? 'Unblock' : 'Block'"
                >
                  <svg v-if="user.is_blocked" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="filteredUsers.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
        <p class="text-gray-500">No users found</p>
      </div>
    </div>
  </div>

  <!-- User Detail Modal -->
  <div v-if="selectedUser" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click="selectedUser = null">
    <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl font-bold text-gray-800">User Details</h3>
          <button @click="selectedUser = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="p-6 space-y-4">
        <div class="flex items-center gap-4 mb-6">
          <div class="h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-2xl">
            {{ getInitials(selectedUser.full_name || selectedUser.email) }}
          </div>
          <div>
            <h4 class="text-xl font-semibold text-gray-800">{{ selectedUser.full_name || 'No name' }}</h4>
            <p class="text-gray-600">{{ selectedUser.email }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-500">Phone</label>
            <p class="text-gray-800">{{ selectedUser.phone || 'Not provided' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Role</label>
            <p class="text-gray-800 capitalize">{{ selectedUser.role || 'user' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Status</label>
            <p class="text-gray-800 capitalize">{{ selectedUser.status || 'active' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Joined</label>
            <p class="text-gray-800">{{ formatDate(selectedUser.created_at) }}</p>
          </div>
        </div>

        <!-- User Stats -->
        <div class="mt-6 pt-6 border-t border-gray-200">
          <h5 class="font-semibold text-gray-800 mb-4">Activity Statistics</h5>
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg text-center">
              <p class="text-2xl font-bold text-blue-600">{{ selectedUser.scan_count || 0 }}</p>
              <p class="text-sm text-gray-600">Scans</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg text-center">
              <p class="text-2xl font-bold text-purple-600">{{ selectedUser.quiz_count || 0 }}</p>
              <p class="text-sm text-gray-600">Quizzes</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg text-center">
              <p class="text-2xl font-bold text-green-600">{{ selectedUser.points || 0 }}</p>
              <p class="text-sm text-gray-600">Points</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { supabase } from '../supabase/client'

const users = ref([])
const searchQuery = ref('')
const selectedUser = ref(null)
let userSubscription = null

onMounted(async () => {
  await loadUsers()
  setupRealtimeSubscription()
})

onUnmounted(() => {
  if (userSubscription) userSubscription.unsubscribe()
})

async function loadUsers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error loading users:', error)
    return
  }

  if (data) {
    // Get counts for each user
    const usersWithCounts = await Promise.all(
      data.map(async (user) => {
        // Get scan count
        const { count: scanCount } = await supabase
          .from('scans')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)

        // Get quiz count
        const { count: quizCount } = await supabase
          .from('quiz_history')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)

        // Get user stats
        const { data: stats } = await supabase
          .from('user_stats')
          .select('points')
          .eq('user_id', user.id)
          .single()

        return {
          ...user,
          scan_count: scanCount || 0,
          quiz_count: quizCount || 0,
          points: stats?.points || 0
        }
      })
    )

    users.value = usersWithCounts
  }
}

function setupRealtimeSubscription() {
  // Subscribe to new users in real-time
  userSubscription = supabase
    .channel('profiles-table-channel')
    .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'profiles' },
      async (payload) => {
        console.log('New user registered:', payload)
        // Add new user to the list
        users.value.unshift({
          ...payload.new,
          scan_count: 0,
          quiz_count: 0,
          points: 0
        })
      }
    )
    .on('postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'profiles' },
      (payload) => {
        console.log('User updated:', payload)
        // Update existing user
        const index = users.value.findIndex(u => u.id === payload.new.id)
        if (index !== -1) {
          users.value[index] = { ...users.value[index], ...payload.new }
        }
      }
    )
    .subscribe()
}

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user => 
    user.email?.toLowerCase().includes(query) ||
    user.full_name?.toLowerCase().includes(query) ||
    user.phone?.includes(query)
  )
})

function getInitials(name) {
  if (!name) return '?'
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

function formatDate(dateString) {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

function viewUser(user) {
  selectedUser.value = user
}

async function toggleRole(user) {
  const newRole = user.role === 'moderator' ? 'user' : 'moderator'
  
  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', user.id)

  if (!error) {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index !== -1) {
      users.value[index].role = newRole
    }
  } else {
    alert('Failed to update user role')
    console.error('Error:', error)
  }
}

async function toggleBlock(user) {
  const newStatus = user.status === 'blocked' ? 'active' : 'blocked'
  
  const { error } = await supabase
    .from('profiles')
    .update({ is_blocked: newStatus === 'blocked' })
    .eq('id', user.id)

  if (!error) {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index !== -1) {
      users.value[index].status = newStatus
      users.value[index].is_blocked = newStatus === 'blocked'
    }
  } else {
    alert('Failed to update user status')
    console.error('Error:', error)
  }
}
</script>