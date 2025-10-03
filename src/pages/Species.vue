<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Mangrove Species</h1>
      <p class="text-gray-600">Manage mangrove species database and information</p>
    </div>

    <!-- Stats Card -->
    <div class="mb-8">
      <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100 inline-block">
        <div class="flex items-center gap-3">
          <div class="bg-green-100 p-3 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
          </div>
          <div>
            <div class="text-sm text-gray-500 font-medium">Total Species</div>
            <div class="text-2xl font-bold text-gray-800">{{ speciesList.length }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Species Table -->
    <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <!-- Header -->
      <div class="p-6 border-b border-gray-200">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 class="text-xl font-bold text-gray-800">Species Database</h2>
            <p class="text-sm text-gray-500 mt-1">Manage mangrove species information</p>
          </div>
          
          <div class="flex gap-3">
            <!-- Search Bar -->
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search species..."
                class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
              <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            
            <!-- Add Species Button -->
            <button
              @click="openAddModal"
              class="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Add Species
            </button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Species</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scientific Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Family</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Habitat</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="species in filteredSpecies" :key="species.id" class="hover:bg-gray-50 transition-colors">
              <!-- Species Info with Image -->
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-12 w-12">
                    <img 
                      v-if="species.image_url" 
                      :src="species.image_url" 
                      :alt="species.common_name"
                      class="h-12 w-12 rounded-lg object-cover"
                    />
                    <div v-else class="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ species.common_name }}</div>
                    <div class="text-sm text-gray-500">{{ species.local_name || 'N/A' }}</div>
                  </div>
                </div>
              </td>

              <!-- Scientific Name -->
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 italic">{{ species.scientific_name }}</div>
              </td>

              <!-- Family -->
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ species.family || 'N/A' }}</div>
              </td>

              <!-- Conservation Status -->
              <td class="px-6 py-4">
                <span 
                  class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-red-100 text-red-800': species.conservation_status === 'endangered',
                    'bg-yellow-100 text-yellow-800': species.conservation_status === 'vulnerable',
                    'bg-green-100 text-green-800': species.conservation_status === 'least_concern',
                    'bg-gray-100 text-gray-800': !species.conservation_status
                  }"
                >
                  {{ formatStatus(species.conservation_status) }}
                </span>
              </td>

              <!-- Habitat -->
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ species.habitat || 'N/A' }}</div>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center gap-2">
                  <button 
                    @click="viewSpecies(species)"
                    class="text-blue-600 hover:text-blue-900 transition-colors"
                    title="View Details"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button 
                    @click="editSpecies(species)"
                    class="text-green-600 hover:text-green-900 transition-colors"
                    title="Edit"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button 
                    @click="deleteSpecies(species)"
                    class="text-red-600 hover:text-red-900 transition-colors"
                    title="Delete"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredSpecies.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
          <p class="text-gray-500">No species found</p>
        </div>
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
  const { data, error } = await supabase
    .from('species')
    .select('*')
    .order('common_name', { ascending: true })

  if (!error && data) {
    speciesList.value = data
  }
}

const filteredSpecies = computed(() => {
  if (!searchQuery.value) return speciesList.value
  
  const query = searchQuery.value.toLowerCase()
  return speciesList.value.filter(species => 
    species.common_name?.toLowerCase().includes(query) ||
    species.scientific_name?.toLowerCase().includes(query) ||
    species.local_name?.toLowerCase().includes(query) ||
    species.family?.toLowerCase().includes(query)
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
  if (!confirm(`Are you sure you want to delete "${species.common_name}"?`)) return

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