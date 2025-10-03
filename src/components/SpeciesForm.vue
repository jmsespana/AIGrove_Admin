<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click="$emit('close')">
    <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
        <div>
          <h3 class="text-2xl font-bold text-gray-800">
            {{ isEdit ? 'Edit Species' : (props.species ? 'Species Details' : 'Add New Species') }}
          </h3>
          <p class="text-sm text-gray-500 mt-1">
            {{ isEdit ? 'Update species information' : (props.species ? 'View species details' : 'Add a new mangrove species to the database') }}
          </p>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- View Mode (Read Only) -->
      <div v-if="props.species && !isEdit" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Image -->
          <div class="md:col-span-2">
            <img 
              v-if="props.species.image_url" 
              :src="props.species.image_url" 
              :alt="props.species.common_name"
              class="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <div v-else class="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>

          <!-- Details -->
          <div>
            <label class="text-sm font-medium text-gray-500">Common Name</label>
            <p class="text-lg font-semibold text-gray-800 mb-4">{{ props.species.common_name }}</p>
          </div>

          <div>
            <label class="text-sm font-medium text-gray-500">Scientific Name</label>
            <p class="text-lg italic text-gray-800 mb-4">{{ props.species.scientific_name }}</p>
          </div>

          <div>
            <label class="text-sm font-medium text-gray-500">Local Name</label>
            <p class="text-lg text-gray-800 mb-4">{{ props.species.local_name || 'N/A' }}</p>
          </div>

          <div>
            <label class="text-sm font-medium text-gray-500">Family</label>
            <p class="text-lg text-gray-800 mb-4">{{ props.species.family || 'N/A' }}</p>
          </div>

          <div class="md:col-span-2">
            <label class="text-sm font-medium text-gray-500">Description</label>
            <p class="text-gray-800 mt-2 leading-relaxed">{{ props.species.description || 'No description available' }}</p>
          </div>

          <div class="md:col-span-2">
            <label class="text-sm font-medium text-gray-500">Characteristics</label>
            <p class="text-gray-800 mt-2 leading-relaxed">{{ props.species.characteristics || 'No characteristics listed' }}</p>
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button
            @click="$emit('close')"
            class="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      <!-- Edit/Add Mode (Form) -->
      <form v-else @submit.prevent="handleSubmit" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Common Name -->
          <div>
            <label for="common_name" class="block text-sm font-medium text-gray-700 mb-2">
              Common Name <span class="text-red-500">*</span>
            </label>
            <input
              id="common_name"
              v-model="formData.common_name"
              type="text"
              required
              placeholder="e.g., Red Mangrove"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Scientific Name -->
          <div>
            <label for="scientific_name" class="block text-sm font-medium text-gray-700 mb-2">
              Scientific Name <span class="text-red-500">*</span>
            </label>
            <input
              id="scientific_name"
              v-model="formData.scientific_name"
              type="text"
              required
              placeholder="e.g., Rhizophora mangle"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Local Name -->
          <div>
            <label for="local_name" class="block text-sm font-medium text-gray-700 mb-2">
              Local Name
            </label>
            <input
              id="local_name"
              v-model="formData.local_name"
              type="text"
              placeholder="e.g., Bakauan"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Family -->
          <div>
            <label for="family" class="block text-sm font-medium text-gray-700 mb-2">
              Family
            </label>
            <input
              id="family"
              v-model="formData.family"
              type="text"
              placeholder="e.g., Rhizophoraceae"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Image URL -->
          <div class="md:col-span-2">
            <label for="image_url" class="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              id="image_url"
              v-model="formData.image_url"
              type="url"
              placeholder="https://example.com/image.jpg"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
            <p class="mt-1 text-sm text-gray-500">Enter the URL of the species image</p>
          </div>

          <!-- Description -->
          <div class="md:col-span-2">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="4"
              placeholder="Detailed description of the species..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
            ></textarea>
          </div>

          <!-- Characteristics -->
          <div class="md:col-span-2">
            <label for="characteristics" class="block text-sm font-medium text-gray-700 mb-2">
              Characteristics
            </label>
            <textarea
              id="characteristics"
              v-model="formData.characteristics"
              rows="4"
              placeholder="Key characteristics and identifying features..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
            ></textarea>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="mt-8 flex justify-end gap-3">
          <button
            type="button"
            @click="$emit('close')"
            class="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="saving"
            class="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!saving">{{ isEdit ? 'Update Species' : 'Add Species' }}</span>
            <span v-else class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { supabase } from '../supabase/client'

const props = defineProps({
  species: Object,
  isEdit: Boolean
})

const emit = defineEmits(['close', 'save'])

const saving = ref(false)
const formData = reactive({
  common_name: '',
  scientific_name: '',
  local_name: '',
  family: '',
  image_url: '',
  description: '',
  characteristics: ''
})

// Initialize form data if editing
watch(() => props.species, (newSpecies) => {
  if (newSpecies && props.isEdit) {
    Object.assign(formData, {
      common_name: newSpecies.common_name || '',
      scientific_name: newSpecies.scientific_name || '',
      local_name: newSpecies.local_name || '',
      family: newSpecies.family || '',
      conservation_status: newSpecies.conservation_status || '',
      habitat: newSpecies.habitat || '',
      image_url: newSpecies.image_url || '',
      description: newSpecies.description || '',
      characteristics: newSpecies.characteristics || ''
    })
  }
}, { immediate: true })

function formatStatus(status) {
  if (!status) return 'Unknown'
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

async function handleSubmit() {
  saving.value = true

  try {
    if (props.isEdit) {
      // Update existing species
      const { error } = await supabase
        .from('species')
        .update(formData)
        .eq('id', props.species.id)

      if (error) throw error
    } else {
      // Insert new species
      const { error } = await supabase
        .from('species')
        .insert([formData])

      if (error) throw error
    }

    emit('save')
  } catch (error) {
    console.error('Error saving species:', error)
    alert('Failed to save species. Please try again.')
  } finally {
    saving.value = false
  }
}
</script>
