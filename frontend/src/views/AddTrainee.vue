<template>
  <div class="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg text-gray-800">
    <h1 class="text-2xl font-bold mb-4">Add Trainee</h1>
    <form @submit.prevent="addTrainee">
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">First Name</label>
        <input v-model="newTrainee.first_name" class="w-full border p-2 rounded-md" type="text" required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Last Name</label>
        <input v-model="newTrainee.last_name" class="w-full border p-2 rounded-md" type="text" required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Avatar (URL)</label>
        <input v-model="newTrainee.avatar" class="w-full border p-2 rounded-md" type="text" required />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Trainee</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

interface Trainee {
  id: number
  first_name: string
  last_name: string
  avatar: string
}

const newTrainee = ref<Trainee>({
  id: 0,
  first_name: '',
  last_name: '',
  avatar: ''
})

const router = useRouter()

const addTrainee = async () => {
  try {
    const { data } = await axios.post('https://reqres.in/api/users', newTrainee.value)
    router.push(`/`)
  } catch (error) {
    console.error('Error adding trainee:', error)
  }
}
</script>
