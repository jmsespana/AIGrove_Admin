<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Users</h1>
      <p class="text-gray-600">Manage and monitor all AIGrove app users</p>
    </div>
    <UserTable />
  </div>
</template>
<script setup>
import UserTable from '../components/UserTable.vue'
</script>