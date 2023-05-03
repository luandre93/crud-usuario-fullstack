// Composables
import { createRouter, createWebHistory } from 'vue-router'
import adminRouter from './adminRouter'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        redirect: "/Administrativo/Usuarios",
        path: '',
        name: 'Home',
        component: Home,
      },
      ...adminRouter,
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
