<script setup lang="ts">
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Profile</h1>
      
      <div v-if="auth.user" class="space-y-4">
        <div class="flex items-center space-x-4">
          <img 
            :src="auth.user.photoURL" 
            :alt="auth.user.displayName"
            class="w-20 h-20 rounded-full"
          >
          <div>
            <h2 class="text-xl font-semibold">{{ auth.user.displayName }}</h2>
            <p class="text-gray-600">{{ auth.user.email }}</p>
          </div>
        </div>

        <div class="mt-8">
          <h3 class="text-lg font-semibold mb-2">Account Details</h3>
          <p class="text-gray-600">Member since: {{ new Date(auth.user.metadata.creationTime).toLocaleDateString() }}</p>
          <p class="text-gray-600">Last login: {{ new Date(auth.user.metadata.lastSignInTime).toLocaleDateString() }}</p>
        </div>
      </div>

      <div v-else class="text-center py-8">
        <p class="text-gray-600">Please log in to view your profile.</p>
        <button 
          @click="auth.loginWithGoogle"
          class="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Login with Google
        </button>
      </div>
    </div>
  </div>
</template>