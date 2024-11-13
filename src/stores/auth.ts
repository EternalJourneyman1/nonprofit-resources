import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from '../firebase/config';
import { GoogleAuthProvider, signInWithPopup, signOut, type User } from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  const loginWithGoogle = async () => {
    try {
      loading.value = true;
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      user.value = result.user;
      error.value = null;
    } catch (err) {
      const firebaseError = err as FirebaseError;
      error.value = firebaseError.message;
      user.value = null;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
      error.value = null;
    } catch (err) {
      const firebaseError = err as FirebaseError;
      error.value = firebaseError.message;
    }
  };

  return {
    user,
    error,
    loading,
    loginWithGoogle,
    logout
  };
});