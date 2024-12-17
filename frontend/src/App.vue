<template>
  <div class="app-layout flex flex-col min-h-screen bg-gray-100 text-white h-screen">
    <header class="bg-blue-600 text-white p-4 shadow-md">
      <h1 class="text-lg font-bold text-center">Recruitment task</h1>
    </header>

    <main class="flex-grow p-4 bg-gray-100">
      <RouterView />
    </main>

    <footer class="bg-blue-800 text-white p-4 text-center shadow-md">
      <p>© 2024 Kacper Śledzik - rekruitment task FootballTeam Frontend Developer</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background: rgb(243 244 246);
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header, footer {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
