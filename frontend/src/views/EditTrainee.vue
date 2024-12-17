<template>
  <div class="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg text-gray-800 mt-20">
    <h1 class="text-2xl font-bold mb-4">Edit Trainee</h1>
    <form @submit.prevent="updateTrainee" v-if="trainee">
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">First Name</label>
        <input v-model="trainee.first_name" class="w-full border p-2 rounded-md" type="text" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Last Name</label>
        <input v-model="trainee.last_name" class="w-full border p-2 rounded-md" type="text" />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
      <button @click="deleteTrainee" class="bg-red-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-red-600">Delete</button>
      <button @click=" router.push('/')" class="bg-gray-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-gray-700">Go back</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

interface Trainee {
  id: number
  first_name: string
  last_name: string
  avatar: string
}

const trainee = ref<Trainee | null>(null)
const router = useRouter()
const route = useRoute()

const fetchTrainee = async () => {
  const { id } = route.params
  const { data } = await axios.get(`https://reqres.in/api/users/${id}`)
  trainee.value = data.data
}

const updateTrainee = async () => {
  try {
    await axios.put(`https://reqres.in/api/users/${route.params.id}`, trainee.value)
    router.push('/')
  } catch (error) {
    console.error('Error updating:', error)
  }
}

const deleteTrainee = async () => {
  try {
    await axios.delete(`https://reqres.in/api/users/${route.params.id}`)
    router.push('/')
  } catch (error) {
    console.error('Error deleting:', error)
  }
}

onMounted(() => {
  fetchTrainee()
})
</script>
