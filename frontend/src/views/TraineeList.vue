<template>
  <div class="p-4 max-w-screen-xl bg-gray-100 text-gray-800 m-auto">
    <h1 class="text-2xl font-bold mb-4 text-gray-900">Trainee list</h1>

    <div class="mb-4 flex items-center justify-between">
      <div class="flex align-middle items-center">
        <input v-model="searchQuery" @input="debouncedFilterTrainees" placeholder="Search..." class="border p-2 rounded w-full bg-white text-gray-900" />
        <FontAwesomeIcon icon="search" class="ml-2 text-gray-500 cursor-pointer" />
      </div>

      <button @click="goToAddUser" class="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add User</button>
    </div>

    <div class="table-wrapper min-h-96">
      <table class="w-full table-auto border-collapse border border-gray-300" v-if="trainees">
        <thead>
        <tr>
          <th class="border border-gray-300 p-2 w-[100px] border-r-0"></th>
          <th class="border border-gray-300 p-2 border-l-0">Fullname</th>
          <th class="border border-gray-300 p-2"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="trainee in trainees" :key="trainee.id">
          <td class="border p-2">
            <img :src="trainee.avatar" alt="Avatar" class="w-12 h-12 rounded-full mx-auto" />
          </td>
          <td class="border p-2">{{ trainee.first_name }} {{ trainee.last_name }}</td>

          <td class="border p-2 h-full gap-2 w-36">
            <div class="m-auto flex w-fit">
              <FontAwesomeIcon icon="edit" class="w-5 h-5 text-blue-600 cursor-pointer" @click="editTrainee(trainee.id)" />
              <FontAwesomeIcon icon="trash" class="w-5 h-5 text-red-500 cursor-pointer" @click="deleteTrainee(trainee.id)" />
            </div>

          </td>
        </tr>
        </tbody>
      </table>
      <div v-else>
        No results...
      </div>
    </div>


    <div class="mt-4 flex justify-center space-x-4" v-if="trainees">
      <button v-if="prevPage" @click="fetchTrainees(prevPage)" class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-200 focus:outline-none">
        Previous
      </button>
      <span class="text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
      <button v-if="nextPage" @click="fetchTrainees(nextPage)" class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-200 focus:outline-none">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { debounce } from '@/utils/debounce'

library.add(faSearch, faEdit, faTrash)

interface Trainee {
  id: number
  first_name: string
  last_name: string
  avatar: string
}

const trainees = ref<Trainee[]>([])
const searchQuery = ref<string>('')
const currentPage = ref<number>(1)
const totalPages = ref<number>(0)
const prevPage = ref<number | null>(null)
const nextPage = ref<number | null>(null)
const router = useRouter()

const fetchTrainees = async (page = 1) => {
  const { data } = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=5`)
  trainees.value = data.data
  totalPages.value = data.total_pages
  currentPage.value = data.page
  prevPage.value = data.page > 1 ? data.page - 1 : null
  nextPage.value = data.page < data.total_pages ? data.page + 1 : null
  filterTrainees()
}

const filterTrainees = () => {
  trainees.value = trainees.value.filter(
    trainee => trainee.first_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      trainee.last_name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
}

const debouncedFilterTrainees = debounce(filterTrainees, 300);

const editTrainee = (id: number) => {
  router.push(`/edit/${id}`)
}

const deleteTrainee = async (id: number) => {
  try {
    await axios.delete(`https://reqres.in/api/users/${id}`)
  } catch (error) {
    console.error('Error deleting:', error)
  }
}

const goToAddUser = () => {
  router.push('/add')
}

onMounted(() => {
  fetchTrainees()
})
</script>

<style scoped>
input {
  width: 100%;
  max-width: 400px;
}

table {
  width: 100%;
  border-spacing: 0;
  border: 1px solid #ddd;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #f8f8f8;
}

td img {
  display: block;
  margin: 0 auto;
}

.font-awesome-icon {
  cursor: pointer;
}
</style>
