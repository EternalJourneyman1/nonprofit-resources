<script setup lang="ts">
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();
</script>

<template>
  <nav class="bg-blue-600 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-xl font-bold">Nonprofit Resources</router-link>
      <div class="flex items-center gap-4">
        <router-link to="/search" class="hover:text-blue-200">Search</router-link>
        <template v-if="auth.user">
          <button @click="auth.logout" class="hover:text-blue-200">Logout</button>
        </template>
        <template v-else>
          <button @click="auth.loginWithGoogle" class="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
            Login with Google
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>