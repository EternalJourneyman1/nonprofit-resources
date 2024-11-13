import { collection, getDocs, query } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { db } from '../firebase/config';

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  categories: string[];
  tags: string[];
  rating: number;
  favorites: number;
}

export const useResourceStore = defineStore('resources', () => {
  const resources = ref<Resource[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const filteredResources = computed(() => 
    (searchQuery: string, selectedCategories: string[]) => {
      return resources.value.filter(resource => {
        const matchesSearch = searchQuery === '' || 
          resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategories = selectedCategories.length === 0 ||
          selectedCategories.some(category => resource.categories.includes(category));

        return matchesSearch && matchesCategories;
      });
    }
  );

  const fetchResources = async () => {
    try {
      loading.value = true;
      const q = query(collection(db, 'resources'));
      const querySnapshot = await getDocs(q);
      resources.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Resource));
      error.value = null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      error.value = 'Failed to fetch resources: ' + errorMessage;
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    resources,
    loading,
    error,
    filteredResources,
    fetchResources
  };
});