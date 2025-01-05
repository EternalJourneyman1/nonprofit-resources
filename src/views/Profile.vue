<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import type { User } from "firebase/auth";

const auth = useAuthStore();

const formatDate = (
  user: User | null,
  dateType: "creationTime" | "lastSignInTime"
): string => {
  if (!user?.metadata?.[dateType]) {
    return "N/A";
  }

  const timestamp = user.metadata[dateType];
  if (typeof timestamp !== "string") {
    return "N/A";
  }

  return new Date(timestamp).toLocaleDateString();
};
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Profile</h1>

      <div v-if="auth.user" class="space-y-4">
        <div class="flex items-center space-x-4">
          <img
            :src="auth.user.photoURL || '/default-avatar.png'"
            :alt="auth.user.displayName || 'User'"
            class="w-20 h-20 rounded-full"
          />
          <div>
            <h2 class="text-xl font-semibold">
              {{ auth.user.displayName || "Anonymous User" }}
            </h2>
            <p class="text-gray-600">{{ auth.user.email || "No email provided" }}</p>
          </div>
        </div>

        <div class="mt-8">
          <h3 class="text-lg font-semibold mb-2">Account Details</h3>
          <p class="text-gray-600">
            Member since: {{ formatDate(auth.user, "creationTime") }}
          </p>
          <p class="text-gray-600">
            Last login: {{ formatDate(auth.user, "lastSignInTime") }}
          </p>
        </div>
      </div>

      <div v-else class="text-center py-8">
        <p class="text-gray-600">Please log in to view your profile.</p>
      </div>
    </div>
  </div>
</template>
