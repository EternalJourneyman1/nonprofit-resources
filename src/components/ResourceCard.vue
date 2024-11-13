<script setup lang="ts">
import { type Resource } from '../stores/resources';
import { logAnalyticsEvent } from '../firebase/config';

const props = defineProps<{
  resource: Resource;
  isAuthenticated: boolean;
}>();

const handleResourceClick = () => {
  logAnalyticsEvent('resource_click', {
    resourceId: props.resource.id,
    resourceTitle: props.resource.title,
    isAuthenticated: props.isAuthenticated
  });
};

const handleRating = () => {
  logAnalyticsEvent('resource_rate', {
    resourceId: props.resource.id,
    resourceTitle: props.resource.title
  });
};

const handleFavorite = () => {
  logAnalyticsEvent('resource_favorite', {
    resourceId: props.resource.id,
    resourceTitle: props.resource.title
  });
};
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-xl font-semibold text-gray-900">
          <a :href="resource.url" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="hover:text-blue-600"
             @click="handleResourceClick">
            {{ resource.title }}
          </a>
        </h3>
        <p class="text-gray-600 mt-2">{{ resource.description }}</p>
      </div>
      
      <div v-if="isAuthenticated" class="flex items-center gap-4">
        <button 
          class="text-gray-400 hover:text-yellow-500"
          @click="handleRating">
          <span class="sr-only">Rate resource</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>
        <button 
          class="text-gray-400 hover:text-red-500"
          @click="handleFavorite">
          <span class="sr-only">Favorite resource</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    </div>

    <div class="mt-4 flex flex-wrap gap-2">
      <span 
        v-for="category in resource.categories" 
        :key="category"
        class="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
      >
        {{ category }}
      </span>
      <span 
        v-for="tag in resource.tags" 
        :key="tag"
        class="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>