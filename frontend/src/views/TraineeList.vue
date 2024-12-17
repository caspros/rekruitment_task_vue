<template>
  <div class="p-4 max-w-screen-xl bg-gray-100 text-gray-800 m-auto">
    <h1 class="text-2xl font-bold mb-4 text-gray-900">Trainee list</h1>

    <div class="mb-4 flex items-center justify-between">
      <div class="flex align-middle items-center">
        <input v-model="searchQuery" @input="debouncedFilterTrainees" placeholder="Search..." class="border p-2 rounded w-full bg-white text-gray-900" />
        <FontAwesomeIcon icon="search" class="ml-2 text-gray-500 cursor-pointer" />
      </div>

      <button @click="goToAddUser" class="ml-4 bg-blue-500 text-white px-1 md:px-4 min-w-24 py-2 rounded-md hover:bg-blue-600">Add Trainee</button>
    </div>

    <div class="table-wrapper min-h-96">
      <table class="w-full table-auto border-collapse border border-gray-300" v-if="displayedTrainees.length">
        <thead>
        <tr>
          <th class="border border-gray-300 p-2 w-[100px] border-r-0"></th>
          <th class="border border-gray-300 p-2 border-l-0">Fullname</th>
          <th class="border border-gray-300 p-2 w-20 md:w-36"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="trainee in displayedTrainees" :key="trainee.id">
          <td class="border p-2">
            <img :src="trainee.avatar" alt="Avatar" class="w-12 h-12 rounded-full mx-auto" />
          </td>
          <td class="border p-2">{{ trainee.first_name }} {{ trainee.last_name }}</td>

          <td class="border p-2 h-full w-20 md:w-36">
            <div class="m-auto flex w-fit">
              <FontAwesomeIcon icon="edit" class="px-2 w-7 h-7 md:scale-125 text-blue-600 cursor-pointer" @click="editTrainee(trainee.id)" />
              <FontAwesomeIcon icon="trash" class="px-2 w-7 h-7 md:scale-125 text-red-500 cursor-pointer" @click="deleteTrainee(trainee.id)" />
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-else class="text-center w-full min-h-96 mt-20 text-xl">
        No results...
      </div>
    </div>

    <div class="mt-4 flex justify-center space-x-4" v-if="displayedTrainees.length && !searchQuery">
      <button @click="fetchTrainees(prevPage)" class="px-4 py-2 border rounded text-gray-700 focus:outline-none" :disabled="!prevPage"
      :class="prevPage ? 'hover:bg-gray-200' : 'opacity-75 cursor-not-allowed'"
      >
        <
      </button>

      <div class="flex space-x-1">
        <button v-for="page in totalPagesArray" :key="page"
                @click="fetchTrainees(page)"
                :class="['px-4 py-2 border rounded', {
                'bg-blue-500 text-white': page === currentPage,
                'bg-gray-200 text-gray-700 hover:bg-gray-300': page !== currentPage
              }]">
          {{ page }}
        </button>
      </div>

      <button :disabled="!nextPage" @click="fetchTrainees(nextPage)" class="px-4 py-2 border rounded text-gray-700 focus:outline-none"
              :class="nextPage ? 'hover:bg-gray-200' : 'opacity-75 cursor-not-allowed'"
      >
        >
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
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

const displayedTrainees = ref<Trainee[]>([])
const allTrainees = ref<Trainee[]>([])
const searchQuery = ref<string>('')
const currentPage = ref<number>(1)
const totalPages = ref<number>(0)
const prevPage = ref<number | null>(null)
const nextPage = ref<number | null>(null)
const router = useRouter()

const totalPagesArray = computed(() => {
  return Array.from({ length: totalPages.value }, (_, i) => i + 1);
});

const fetchTrainees = async (page = 1) => {
  const { data } = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=5`)
  allTrainees.value = data.data
  displayedTrainees.value = data.data
  totalPages.value = data.total_pages
  currentPage.value = data.page
  prevPage.value = data.page > 1 ? data.page - 1 : null
  nextPage.value = data.page < data.total_pages ? data.page + 1 : null
  filterTrainees()
}

const filterTrainees = () => {
  displayedTrainees.value = allTrainees.value
  displayedTrainees.value = displayedTrainees.value.filter(
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
    if (searchQuery.value) {
      filterTrainees()
    } else {
      fetchTrainees()
    }
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
