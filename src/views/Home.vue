<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { logAnalyticsEvent } from '../firebase/config';

const auth = useAuthStore();
const router = useRouter();

const goToSearch = () => {
  logAnalyticsEvent('navigation', {
    from: 'home',
    to: 'search',
    isAuthenticated: !!auth.user
  });
  router.push('/search');
};

onMounted(() => {
  logAnalyticsEvent('page_view', { page: 'home' });
});
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Welcome to Nonprofit Resources</h1>
    
    <div class="space-y-6">
      <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Find Resources for Your Nonprofit</h2>
        <p class="text-gray-600 mb-6">
          Browse our comprehensive database of nonprofit resources. 
          <template v-if="!auth.user">
            Sign in to rate and save your favorite resources.
          </template>
        </p>
        <div class="flex gap-4">
          <button 
            @click="goToSearch"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Searching
          </button>
          <button 
            v-if="!auth.user"
            @click="auth.loginWithGoogle"
            class="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  </div>
</template>