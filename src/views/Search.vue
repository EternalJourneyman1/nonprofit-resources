<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useResourceStore } from '../stores/resources';
import ResourceCard from '../components/ResourceCard.vue';
import { logAnalyticsEvent } from '../firebase/config';

const auth = useAuthStore();
const resourceStore = useResourceStore();
const searchQuery = ref('');
const selectedCategories = ref<string[]>([]);

const categories = [
  'Fundraising',
  'Grant Writing',
  'Volunteer Management',
  'Legal Resources',
  'Financial Management',
  'Technology',
  'Marketing'
];

// Track search queries
watch(searchQuery, (newQuery) => {
  if (newQuery.length > 2) {
    logAnalyticsEvent('search', { 
      query: newQuery,
      categories: selectedCategories.value
    });
  }
});

// Track category selections
watch(selectedCategories, (newCategories) => {
  logAnalyticsEvent('category_filter', {
    categories: newCategories
  });
});

onMounted(() => {
  resourceStore.fetchResources();
  logAnalyticsEvent('page_view', { page: 'search' });
});
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Search Resources</h1>

    <div class="space-y-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="mb-6">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Search resources..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-3">Categories</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategories.includes(category) 
                ? selectedCategories = selectedCategories.filter(c => c !== category)
                : selectedCategories.push(category)"
              :class="[
                'px-3 py-1 rounded-full border',
                selectedCategories.includes(category)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 hover:border-blue-600'
              ]"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="resourceStore.loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>

      <div v-else-if="resourceStore.error" class="bg-red-50 p-4 rounded-lg text-red-600">
        {{ resourceStore.error }}
      </div>

      <div v-else class="grid gap-6">
        <ResourceCard
          v-for="resource in resourceStore.filteredResources(searchQuery, selectedCategories)"
          :key="resource.id"
          :resource="resource"
          :is-authenticated="!!auth.user"
        />
      </div>
    </div>
  </div>
</template>