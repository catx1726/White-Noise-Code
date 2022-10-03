import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: Layout,
      children: [{ path: '/', name: 'home', component: () => import('../views/home/index.vue') }]
    },
    {
      path: '/about',
      name: 'AboutLayout',
      component: Layout,
      children: [
        {
          path: '/about',
          name: 'AboutPage',
          component: () => import('../views/about/index.vue')
        }
      ]
    }
  ]
})

export default router
