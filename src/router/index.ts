import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import HistoryView from '@/views/HistoryView.vue'
import RecordView from '@/views/RecordView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: LoginView,
      meta: 
      {
        requiresAuth: false
      }
    },
    {
      path: '/',
      component: MainLayout,
      children: [
      {
        path: 'record',
        component: RecordView,
      },
      {
        path: 'history',
        component: HistoryView,
      }
    ],
    meta: 
    {
      requiresAuth: true 
    }
  }
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/')
  } else {
    next()
  }
})
export default router
