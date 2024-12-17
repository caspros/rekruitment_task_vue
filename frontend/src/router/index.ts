import { createRouter, createWebHistory } from 'vue-router'
import TraineeList from '../views/TraineeList.vue'
import AddTrainee from '../views/AddTrainee.vue'
import EditTrainee from '../views/EditTrainee.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'trainee-list',
      component: TraineeList,
    },
    {
      path: '/add',
      name: 'add-trainee',
      component: AddTrainee,
    },
    {
      path: '/edit/:id',
      name: 'edit-trainee',
      component: EditTrainee,
      props: true,
    },
  ],
})

export default router
