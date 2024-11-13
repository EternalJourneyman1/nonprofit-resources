<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />
    <main class="container mx-auto px-4 py-8">
      <router-view></router-view>
    </main>
  </div>
</template>
