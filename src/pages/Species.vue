<template>
  <div class="p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">🌿 Mangrove Species</h1>
      <p class="text-gray-600">Explore and manage mangrove species information</p>
    </div>

    <!-- Stats Cards -->
    <div class="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
        <div class="flex items-center gap-3">
          <div class="bg-green-100 p-3 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
          </div>
          <div>
            <div class="text-sm text-gray-500 font-medium">Total Species</div>
            <div class="text-3xl font-bold text-green-600">{{ speciesList.length }}</div>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
        <div class="flex items-center gap-3">
          <div class="bg-blue-100 p-3 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div>
            <div class="text-sm text-gray-500 font-medium">Ecosystem Value</div>
            <div class="text-3xl font-bold text-blue-600">Critical</div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
        <div class="flex items-center gap-3">
          <div class="bg-emerald-100 p-3 rounded-lg">
            <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <div class="text-sm text-gray-500 font-medium">Carbon Storage</div>
            <div class="text-3xl font-bold text-emerald-600">High</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Species Container -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- View Toggle Controls -->
      <div class="lg:col-span-4 flex justify-between items-center mb-4">
        <div class="relative flex-1 max-w-xs">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search species..."
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none shadow-sm"
          />
          <svg class="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        
        <button
          @click="openAddModal"
          class="ml-4 flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add Species
        </button>
      </div>

      <!-- Species Cards Grid -->
      <template v-if="filteredSpecies.length > 0">
        <div 
          v-for="species in filteredSpecies" 
          :key="species.id"
          class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
        >
          <!-- Image -->
          <div class="h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center overflow-hidden">
            <img 
              v-if="species.image_url" 
              :src="species.image_url" 
              :alt="species.name"
              class="h-full w-full object-cover"
            />
            <div v-else class="flex flex-col items-center justify-center gap-2">
              <svg class="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span class="text-sm text-green-600 font-medium">No Image</span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-5 flex-1 flex flex-col">
            <!-- Title -->
            <h3 class="text-lg font-bold text-gray-800 mb-1 line-clamp-2">{{ species.name }}</h3>
            
            <!-- Scientific Name -->
            <p class="text-sm text-gray-500 italic mb-3 line-clamp-1">{{ species.scientif_name }}</p>

            <!-- Description -->
            <p class="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">{{ species.description }}</p>

            <!-- Badge -->
            <div class="mb-4 flex gap-2">
              <span class="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                🌿 Mangrove
              </span>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 pt-4 border-t border-gray-100">
              <button 
                @click="viewSpecies(species)"
                class="flex-1 flex items-center justify-center gap-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 font-medium py-2 px-3 rounded-lg transition-colors"
                title="View Details"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                View
              </button>
              <button 
                @click="editSpecies(species)"
                class="flex-1 flex items-center justify-center gap-2 text-green-600 hover:text-green-900 hover:bg-green-50 font-medium py-2 px-3 rounded-lg transition-colors"
                title="Edit"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Edit
              </button>
              <button 
                @click="deleteSpecies(species)"
                class="flex-1 flex items-center justify-center gap-2 text-red-600 hover:text-red-900 hover:bg-red-50 font-medium py-2 px-3 rounded-lg transition-colors"
                title="Delete"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      </template>

      <!-- Empty State -->
      <div v-else class="lg:col-span-4 text-center py-16">
        <svg class="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
        <p class="text-gray-500 text-lg">No species found</p>
      </div>
    </div>

    <!-- Species Form Modal -->
    <SpeciesForm 
      v-if="showModal"
      :species="selectedSpecies"
      :isEdit="isEdit"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase/client'
import SpeciesForm from '../components/SpeciesForm.vue'

const speciesList = ref([])
const searchQuery = ref('')
const showModal = ref(false)
const selectedSpecies = ref(null)
const isEdit = ref(false)

onMounted(async () => {
  await loadSpecies()
})

async function loadSpecies() {
  try {
    const { data, error } = await supabase
      .from('species')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('❌ Error loading species:', error)
      console.error('Error message:', error.message)
      console.error('Error details:', error.details)
    } else {
      console.log('✅ Species loaded successfully:', data)
      console.log('Total species:', data?.length || 0)
      speciesList.value = data || []
    }
  } catch (err) {
    console.error('❌ Exception loading species:', err)
  }
}

const filteredSpecies = computed(() => {
  if (!searchQuery.value) return speciesList.value
  
  const query = searchQuery.value.toLowerCase()
  return speciesList.value.filter(species => 
    species.name?.toLowerCase().includes(query) ||
    species.scientif_name?.toLowerCase().includes(query) ||
    species.description?.toLowerCase().includes(query)
  )
})

function formatStatus(status) {
  if (!status) return 'Unknown'
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

function openAddModal() {
  selectedSpecies.value = null
  isEdit.value = false
  showModal.value = true
}

function editSpecies(species) {
  selectedSpecies.value = { ...species }
  isEdit.value = true
  showModal.value = true
}

function viewSpecies(species) {
  selectedSpecies.value = { ...species }
  isEdit.value = false
  showModal.value = true
}

async function deleteSpecies(species) {
  if (!confirm(`Are you sure you want to delete "${species.name}"?`)) return

  const { error } = await supabase
    .from('species')
    .delete()
    .eq('id', species.id)

  if (!error) {
    await loadSpecies()
  } else {
    alert('Failed to delete species')
  }
}

function closeModal() {
  showModal.value = false
  selectedSpecies.value = null
}

async function handleSave() {
  await loadSpecies()
  closeModal()
}
</script>