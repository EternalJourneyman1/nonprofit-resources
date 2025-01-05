import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '../firebase/config';
import { 
  collection, 
  query, 
  getDocs,
  orderBy,
  limit,
  Timestamp,
  addDoc,
  type DocumentData,
  serverTimestamp
} from 'firebase/firestore';

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  categories: string[];
  tags: string[];
  rating: number;
  favorites: number;
  createdAt?: Date;
}

export const useResourceStore = defineStore('resources', () => {
  const resources = ref<Resource[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const filteredResources = computed(() => 
    (searchQuery: string, selectedCategories: string[]) => {
      return resources.value.filter(resource => {
        const matchesSearch = !searchQuery || 
          resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategories = selectedCategories.length === 0 ||
          resource.categories.some(category => selectedCategories.includes(category));

        return matchesSearch && matchesCategories;
      });
    }
  );

  const initializeDefaultResources = async () => {
    const defaultResources = [
      {
        title: "Nonprofit Grant Writing Guide",
        description: "A comprehensive guide to writing successful grant proposals for nonprofit organizations.",
        url: "https://example.com/grant-writing",
        categories: ["Grant Writing"],
        tags: ["grants", "fundraising", "writing"],
        rating: 4.5,
        favorites: 0,
        createdAt: serverTimestamp()
      },
      {
        title: "Volunteer Management Best Practices",
        description: "Learn effective strategies for recruiting, managing, and retaining volunteers.",
        url: "https://example.com/volunteer-management",
        categories: ["Volunteer Management"],
        tags: ["volunteers", "management", "recruitment"],
        rating: 4.0,
        favorites: 0,
        createdAt: serverTimestamp()
      }
    ];

    try {
      const resourcesRef = collection(db, 'resources');
      for (const resource of defaultResources) {
        await addDoc(resourcesRef, resource);
      }
    } catch (err) {
      console.error('Error adding default resources:', err);
    }
  };

  const fetchResources = async () => {
    try {
      loading.value = true;
      error.value = null;

      const resourcesRef = collection(db, 'resources');
      const q = query(
        resourcesRef,
        orderBy('createdAt', 'desc'),
        limit(50)
      );

      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        await initializeDefaultResources();
        await fetchResources();
        return;
      }

      resources.value = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || '',
          description: data.description || '',
          url: data.url || '',
          categories: Array.isArray(data.categories) ? data.categories : [],
          tags: Array.isArray(data.tags) ? data.tags : [],
          rating: typeof data.rating === 'number' ? data.rating : 0,
          favorites: typeof data.favorites === 'number' ? data.favorites : 0,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined
        };
      });

    } catch (err) {
      console.error('Error fetching resources:', err);
      error.value = 'Failed to fetch resources. Please try again later.';
      resources.value = [];
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