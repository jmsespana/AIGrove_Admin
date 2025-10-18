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

          <!-- Image Upload -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Species Image
            </label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Image Preview -->
              <div class="flex items-center justify-center">
                <div v-if="imagePreview || formData.image_url" class="w-full h-48 rounded-lg overflow-hidden shadow-md">
                  <img 
                    :src="imagePreview || formData.image_url" 
                    :alt="formData.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div v-else class="w-full h-48 bg-gray-100 rounded-lg flex flex-col items-center justify-center gap-2">
                  <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p class="text-sm text-gray-400">No image</p>
                </div>
              </div>

              <!-- Upload Controls -->
              <div class="flex flex-col gap-3">
                <div>
                  <label for="image_file" class="block text-sm font-medium text-gray-700 mb-2">
                    Upload Image File
                  </label>
                  <input
                    id="image_file"
                    type="file"
                    accept="image/*"
                    @change="handleImageUpload"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                  />
                  <p class="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                </div>

                <div>
                  <label for="image_url" class="block text-sm font-medium text-gray-700 mb-2">
                    Or paste Image URL
                  </label>
                  <input
                    id="image_url"
                    v-model="formData.image_url"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>

                <div v-if="uploading" class="flex items-center gap-2 text-sm text-blue-600">
                  <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading image...
                </div>
              </div>
            </div>
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
const uploading = ref(false)
const imagePreview = ref('')

const formData = reactive({
  name: '',
  scientif_name: '',
  description: '',
  image_url: '',
  common_name: '',
  scientific_name: '',
  local_name: '',
  family: '',
  characteristics: ''
})

// Initialize form data if editing
watch(() => props.species, (newSpecies) => {
  if (newSpecies && props.isEdit) {
    Object.assign(formData, {
      name: newSpecies.name || '',
      scientif_name: newSpecies.scientif_name || '',
      scientific_name: newSpecies.scientific_name || '',
      common_name: newSpecies.common_name || '',
      local_name: newSpecies.local_name || '',
      family: newSpecies.family || '',
      description: newSpecies.description || '',
      image_url: newSpecies.image_url || '',
      characteristics: newSpecies.characteristics || ''
    })
    imagePreview.value = newSpecies.image_url || ''
  }
}, { immediate: true })

async function handleImageUpload(event) {
  const file = event.target.files?.[0]
  if (!file) return

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    alert('Image must be less than 5MB')
    return
  }

  // Show preview
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target?.result
  }
  reader.readAsDataURL(file)

  // Upload to Supabase Storage
  uploading.value = true
  try {
    const timestamp = Date.now()
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`
    
    const { data, error } = await supabase.storage
      .from('species-images')
      .upload(fileName, file)

    if (error) throw error

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('species-images')
      .getPublicUrl(fileName)

    formData.image_url = urlData.publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    alert('Failed to upload image. Please try again.')
    imagePreview.value = ''
  } finally {
    uploading.value = false
  }
}

function formatStatus(status) {
  if (!status) return 'Unknown'
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

async function handleSubmit() {
  saving.value = true

  try {
    // Use the correct field names for your database (name and scientif_name)
    const submitData = {
      name: formData.name || formData.common_name,
      scientif_name: formData.scientif_name || formData.scientific_name,
      description: formData.description,
      image_url: formData.image_url
    }

    if (props.isEdit) {
      // Update existing species
      const { error } = await supabase
        .from('species')
        .update(submitData)
        .eq('id', props.species.id)

      if (error) throw error
    } else {
      // Insert new species
      const { error } = await supabase
        .from('species')
        .insert([submitData])

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
