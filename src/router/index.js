import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Story from '../views/Story.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/story/:id', name: 'Story', component: Story, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router