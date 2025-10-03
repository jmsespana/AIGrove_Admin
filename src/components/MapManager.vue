<template>
  <div>
    <div class="mb-4">
      <button class="bg-green-600 text-white px-4 py-2 rounded" @click="addSpecies">Add Species</button>
    </div>
    <!-- Placeholder for interactive map -->
    <div class="w-full h-96 bg-gray-200 flex items-center justify-center rounded">
      <span class="text-gray-500">[Map Here]</span>
    </div>
  </div>
</template>
<script setup>
function addSpecies() {
  alert('Add species functionality coming soon!')
}
</script>